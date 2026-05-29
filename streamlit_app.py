import os
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import seaborn as sns
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    roc_curve,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)
import xgboost as xgb
import lightgbm as lgb
import warnings

warnings.filterwarnings("ignore")


@st.cache_data
def load_data(path):
    return pd.read_csv(path)


def prepare_data(df, target_col="Financial_Status"):
    """Prepare data for model training"""
    df_prep = df.copy()

    # Encode target variable if it's categorical
    if df_prep[target_col].dtype == "object":
        le = LabelEncoder()
        df_prep[target_col] = le.fit_transform(df_prep[target_col])

    # Select numeric features
    X = df_prep.select_dtypes(include=["number"]).drop(columns=[target_col], errors="ignore")
    y = df_prep[target_col]

    return X, y, X.columns.tolist()


def train_models(X_train, X_test, y_train, y_test):
    """Train multiple ML models"""
    models = {}

    # Logistic Regression
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train, y_train)
    models["Logistic Regression"] = lr

    # Random Forest
    rf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    rf.fit(X_train, y_train)
    models["Random Forest"] = rf

    # Gradient Boosting
    gb = GradientBoostingClassifier(n_estimators=100, random_state=42)
    gb.fit(X_train, y_train)
    models["Gradient Boosting"] = gb

    # XGBoost
    xgb_model = xgb.XGBClassifier(n_estimators=100, random_state=42, use_label_encoder=False, eval_metric="logloss")
    xgb_model.fit(X_train, y_train)
    models["XGBoost"] = xgb_model

    # LightGBM
    lgb_model = lgb.LGBMClassifier(n_estimators=100, random_state=42, verbose=-1)
    lgb_model.fit(X_train, y_train)
    models["LightGBM"] = lgb_model

    return models


def evaluate_models(models, X_test, y_test):
    """Evaluate all trained models"""
    results = {}
    predictions = {}

    for name, model in models.items():
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else model.predict(X_test)

        results[name] = {
            "Accuracy": accuracy_score(y_test, y_pred),
            "Precision": precision_score(y_test, y_pred, average="weighted"),
            "Recall": recall_score(y_test, y_pred, average="weighted"),
            "F1 Score": f1_score(y_test, y_pred, average="weighted"),
            "AUC-ROC": roc_auc_score(y_test, y_pred_proba, average="weighted") if len(np.unique(y_test)) == 2 else 0,
        }

        predictions[name] = {"y_pred": y_pred, "y_pred_proba": y_pred_proba}

    return results, predictions


def load_saved_model(model_path="fraud_model.pkl"):
    if os.path.exists(model_path):
        try:
            return joblib.load(model_path)
        except Exception as e:
            st.warning(f"Không thể tải mô hình đã lưu: {e}")
    return None


def main():
    st.set_page_config(page_title="Fraud Detection Analysis", layout="wide")
    st.title("🔍 Fraud Detection — Comprehensive Analysis")

    st.sidebar.header("⚙️ Configuration")
    use_default = st.sidebar.checkbox("Use default dataset", value=True)

    uploaded = None
    if not use_default:
        uploaded = st.sidebar.file_uploader("Upload CSV", type=["csv"])

    if use_default or uploaded is None:
        data_path = "data/Financial Statement Anomaly Dataset.csv"
        df = load_data(data_path)
    else:
        df = pd.read_csv(uploaded)

    st.sidebar.markdown(f"📊 **Dataset Shape:** {df.shape[0]} rows × {df.shape[1]} columns")

    # Create tabs for different analyses
    tab1, tab2, tab3, tab4 = st.tabs(["📈 Dataset Overview", "📊 Data Distribution", "🤖 Model Training", "📉 Model Evaluation"])

    # ============ TAB 1: Dataset Overview ============
    with tab1:
        st.subheader("📋 Dataset Preview")
        st.dataframe(df.head(200), use_container_width=True)

        col1, col2 = st.columns(2)
        with col1:
            st.subheader("📌 Dataset Information")
            info_data = {
                "Total Rows": df.shape[0],
                "Total Columns": df.shape[1],
                "Numeric Features": len(df.select_dtypes(include=["number"]).columns),
                "Categorical Features": len(df.select_dtypes(include=["object"]).columns),
                "Memory Usage (MB)": df.memory_usage(deep=True).sum() / 1024**2,
            }
            st.json(info_data)

        with col2:
            st.subheader("🔍 Missing Values")
            missing = df.isnull().sum()
            if missing.sum() > 0:
                st.dataframe(missing[missing > 0])
            else:
                st.success("✅ No missing values detected!")

        st.subheader("📊 Summary Statistics")
        st.dataframe(df.describe(), use_container_width=True)

        st.subheader("📑 Data Types")
        dtypes_df = pd.DataFrame({"Column": df.columns, "Data Type": df.dtypes.astype(str)})
        st.dataframe(dtypes_df, use_container_width=True)

        st.subheader("🔎 Column Selector & Summary")
        numeric_cols_all = df.select_dtypes(include=["number"]).columns.tolist()
        cols = st.multiselect("Select numeric columns", options=numeric_cols_all, default=numeric_cols_all)
        st.session_state.selected_cols = cols
        
        if cols:
            st.write(df[cols].describe())

    # ============ TAB 2: Data Distribution ============
    with tab2:
        numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()

        st.subheader("🎯 Target Variable Distribution")
        if "Financial_Status" in df.columns:
            fig = px.histogram(df, x="Financial_Status", color="Financial_Status", text_auto=True, title="Financial Status Distribution")
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("📈 Feature Distributions")
        col1, col2 = st.columns([3, 1])
        with col1:
            feature = st.selectbox("Select feature for detailed histogram", options=numeric_cols)
        with col2:
            nbins = st.slider("Number of bins", 10, 100, 50)

        if feature:
            fig = px.histogram(df, x=feature, nbins=nbins, title=f"Distribution of {feature}")
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("🔗 Correlation Heatmap")
        if len(numeric_cols) > 1:
            corr = df[numeric_cols].corr()
            fig, ax = plt.subplots(figsize=(12, 8))
            sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", ax=ax, cbar_kws={"label": "Correlation"})
            st.pyplot(fig)

        st.subheader("📊 Scatter Matrix")
        pair_cols = st.multiselect("Select columns for scatter matrix", options=numeric_cols, default=numeric_cols[:min(4, len(numeric_cols))])
        if pair_cols and len(pair_cols) > 1:
            fig = px.scatter_matrix(df[pair_cols].dropna(), dimensions=pair_cols, title="Scatter Matrix")
            st.plotly_chart(fig, use_container_width=True)

    # ============ TAB 3: Model Training ============
    with tab3:
        st.subheader("🤖 Machine Learning Model Training")

        col1, col2 = st.columns(2)
        with col1:
            test_size = st.slider("Test set size", 0.1, 0.5, 0.2)
        with col2:
            random_state = st.number_input("Random state", value=42)

        if st.button("🚀 Train All Models"):
            with st.spinner("Training models..."):
                X, y, feature_cols = prepare_data(df)
                scaler = StandardScaler()
                X_scaled = scaler.fit_transform(X)
                X_train, X_test, y_train, y_test = train_test_split(
                    X_scaled, y, test_size=test_size, random_state=random_state, stratify=y
                )

                models = train_models(X_train, X_test, y_train, y_test)
                results, predictions = evaluate_models(models, X_test, y_test)

                # Store in session state
                st.session_state.models = models
                st.session_state.results = results
                st.session_state.predictions = predictions
                st.session_state.X_test = X_test
                st.session_state.y_test = y_test
                st.session_state.feature_cols = feature_cols

                st.success("✅ Models trained successfully!")

                # Display training results
                st.subheader("📊 Model Performance Summary")
                results_df = pd.DataFrame(results).T
                st.dataframe(results_df.style.highlight_max(axis=0, color="lightgreen"), use_container_width=True)

    # ============ TAB 4: Model Evaluation ============
    with tab4:
        st.subheader("📉 Model Evaluation & Analysis")

        if "results" in st.session_state:
            results = st.session_state.results
            predictions = st.session_state.predictions
            y_test = st.session_state.y_test

            col1, col2 = st.columns(2)
            with col1:
                selected_model = st.selectbox("Select model for detailed analysis", options=list(results.keys()))

            with col2:
                st.metric(label="Accuracy", value=f"{results[selected_model]['Accuracy']:.4f}")

            # Confusion Matrix
            st.subheader("🔲 Confusion Matrix")
            y_pred = predictions[selected_model]["y_pred"]
            cm = confusion_matrix(y_test, y_pred)
            fig = px.imshow(cm, labels=dict(x="Predicted", y="Actual"), color_continuous_scale="Blues", title=f"Confusion Matrix - {selected_model}")
            st.plotly_chart(fig, use_container_width=True)

            # Classification Report
            st.subheader("📋 Classification Report")
            report = classification_report(y_test, y_pred, output_dict=True)
            report_df = pd.DataFrame(report).transpose()
            st.dataframe(report_df, use_container_width=True)

            # ROC Curve (for binary classification)
            if len(np.unique(y_test)) == 2:
                st.subheader("📊 ROC Curve")
                y_pred_proba = predictions[selected_model]["y_pred_proba"]
                fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
                fig = go.Figure()
                fig.add_trace(go.Scatter(x=fpr, y=tpr, mode="lines", name=f"ROC (AUC={results[selected_model]['AUC-ROC']:.4f})"))
                fig.add_trace(go.Scatter(x=[0, 1], y=[0, 1], mode="lines", name="Random Classifier", line=dict(dash="dash")))
                fig.update_layout(title="ROC Curve", xaxis_title="False Positive Rate", yaxis_title="True Positive Rate")
                st.plotly_chart(fig, use_container_width=True)

            # Feature Importance
            st.subheader("🔍 Feature Importance")
            feature_cols = st.session_state.feature_cols
            model = st.session_state.models[selected_model]

            if hasattr(model, "feature_importances_"):
                importances = model.feature_importances_
                importance_df = pd.DataFrame({"Feature": feature_cols, "Importance": importances}).sort_values("Importance", ascending=False)
                fig = px.bar(importance_df.head(15), x="Importance", y="Feature", orientation="h", title="Top 15 Feature Importances")
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.info("ℹ️ Feature importance not available for this model type")

            # Model Comparison
            st.subheader("🏆 Model Comparison")
            results_df = pd.DataFrame(results).T
            fig = px.bar(results_df.reset_index(), x="index", y=["Accuracy", "Precision", "Recall", "F1 Score"], title="Model Performance Comparison")
            st.plotly_chart(fig, use_container_width=True)

            st.subheader("🧪 Saved Model Prediction")
            saved_model = load_saved_model("fraud_model.pkl")
            if saved_model is not None:
                st.info("Mô hình đã lưu được phát hiện trong `fraud_model.pkl`. Bạn có thể nhập giá trị để dự đoán.")
                prediction_inputs = {}
                with st.form("saved_model_prediction_form"):
                    for col in st.session_state.feature_cols:
                        default_value = float(df[col].median()) if np.issubdtype(df[col].dtype, np.number) else 0.0
                        prediction_inputs[col] = st.number_input(col, value=default_value)
                    use_saved_model = st.form_submit_button("Predict with saved model")

                if use_saved_model:
                    input_df = pd.DataFrame([prediction_inputs])
                    try:
                        pred = saved_model.predict(input_df)[0]
                        proba = None
                        if hasattr(saved_model, "predict_proba"):
                            proba = saved_model.predict_proba(input_df)[0]
                        st.success(f"Predicted Financial_Status: {pred}")
                        if proba is not None:
                            st.write("Class probabilities:", proba)
                    except Exception as e:
                        st.error(f"Không thể dự đoán với mô hình đã lưu: {e}")
            else:
                st.info("ℹ️ Không tìm thấy file mô hình đã lưu `fraud_model.pkl`. Vui lòng chạy `main.py` hoặc huấn luyện mô hình trong tab 'Model Training'.")

        else:
            st.warning("⚠️ Please train models first in the 'Model Training' tab!")

    st.sidebar.markdown("---")
    
    # Download filtered data section
    if "selected_cols" in st.session_state and st.session_state.selected_cols:
        if st.sidebar.button("📥 Download Filtered CSV"):
            to_download = df[st.session_state.selected_cols]
            csv = to_download.to_csv(index=False).encode("utf-8")
            st.sidebar.download_button("Download CSV", data=csv, file_name="filtered_data.csv", mime="text/csv")
    
    # Download model results section
    if st.sidebar.button("📥 Download Model Results"):
        if "results" in st.session_state:
            results_df = pd.DataFrame(st.session_state.results).T
            csv = results_df.to_csv().encode("utf-8")
            st.sidebar.download_button("Download Model Results CSV", data=csv, file_name="model_results.csv", mime="text/csv")


if __name__ == "__main__":
    main()
