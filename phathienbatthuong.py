"""
Script to create anomaly detection visualization charts
Visualizes model accuracy and anomaly detection results
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import os

# Create images directory if it doesn't exist
os.makedirs("images", exist_ok=True)

print("=" * 60)
print("🔍 ANOMALY DETECTION VISUALIZATION")
print("=" * 60)

# Load dataset
print("\n📊 Loading dataset...")
df = pd.read_csv("data/Financial Statement Anomaly Dataset.csv")
print(f"✅ Dataset loaded: {df.shape[0]} rows × {df.shape[1]} columns")

# Prepare data
X = df.drop("Financial_Status", axis=1)
y = df["Financial_Status"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
print("\n🤖 Training RandomForestClassifier...")
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)
print("✅ Model training completed!")

# Make predictions
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
cm = confusion_matrix(y_test, predictions)

print(f"\n📈 Model Accuracy: {accuracy:.4f}")
print(f"\nConfusion Matrix:\n{cm}")

# ============ CHART 1: Accuracy Bar Chart ============
print("\n📊 Creating Accuracy Chart...")
fig, ax = plt.subplots(figsize=(8, 5))
colors = ['#2ecc71' if accuracy > 0.8 else '#f39c12']
bars = ax.bar(['Model Accuracy'], [accuracy], color=colors, edgecolor='black', linewidth=2)

# Add value label on bar
ax.text(0, accuracy + 0.02, f'{accuracy:.2%}', ha='center', fontsize=14, fontweight='bold')

ax.set_ylabel('Accuracy Score', fontsize=12, fontweight='bold')
ax.set_title('🎯 Model Accuracy - Fraud Detection', fontsize=14, fontweight='bold')
ax.set_ylim(0, 1)
ax.grid(axis='y', alpha=0.3, linestyle='--')

plt.tight_layout()
plt.savefig('images/anomaly_chart.png', dpi=300, bbox_inches='tight')
print("✅ Saved: images/anomaly_chart.png")
plt.close()

# ============ CHART 2: Confusion Matrix Heatmap ============
print("\n📊 Creating Confusion Matrix Heatmap...")
fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=True, 
            xticklabels=['Normal', 'Abnormal'],
            yticklabels=['Normal', 'Abnormal'],
            ax=ax, linewidths=2, linecolor='black')
ax.set_ylabel('True Label', fontsize=12, fontweight='bold')
ax.set_xlabel('Predicted Label', fontsize=12, fontweight='bold')
ax.set_title('📊 Confusion Matrix - Model Predictions', fontsize=14, fontweight='bold')

plt.tight_layout()
plt.savefig('images/confusion_matrix.png', dpi=300, bbox_inches='tight')
print("✅ Saved: images/confusion_matrix.png")
plt.close()

# ============ CHART 3: Metrics Comparison ============
print("\n📊 Creating Metrics Comparison Chart...")
from sklearn.metrics import precision_score, recall_score, f1_score

precision = precision_score(y_test, predictions, average='weighted')
recall = recall_score(y_test, predictions, average='weighted')
f1 = f1_score(y_test, predictions, average='weighted')

metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score']
scores = [accuracy, precision, recall, f1]
colors_metrics = ['#2ecc71', '#3498db', '#e74c3c', '#f39c12']

fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.bar(metrics, scores, color=colors_metrics, edgecolor='black', linewidth=2)

# Add value labels on bars
for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 0.02,
            f'{height:.3f}', ha='center', va='bottom', fontsize=11, fontweight='bold')

ax.set_ylabel('Score', fontsize=12, fontweight='bold')
ax.set_title('📈 Model Performance Metrics', fontsize=14, fontweight='bold')
ax.set_ylim(0, 1.1)
ax.grid(axis='y', alpha=0.3, linestyle='--')

plt.tight_layout()
plt.savefig('images/metrics_comparison.png', dpi=300, bbox_inches='tight')
print("✅ Saved: images/metrics_comparison.png")
plt.close()

# ============ CHART 4: Classification Report ============
print("\n📊 Creating Classification Report...")
print("\nClassification Report:")

# Determine labels and target names dynamically to support multi-class
import numpy as np
labels = np.unique(y_test)
try:
    if labels.size == 2:
        target_names = ['Normal', 'Abnormal']
    else:
        # Create readable names for each class
        target_names = [f'Class_{int(l)}' if np.issubdtype(type(l), np.number) else str(l) for l in labels]

    report = classification_report(y_test, predictions, labels=labels, target_names=target_names)
    print(report)
except Exception:
    # Fallback to default report if something unexpected occurs
    report = classification_report(y_test, predictions)
    print(report)

# Save text report
with open('images/classification_report.txt', 'w') as f:
    f.write("=" * 60 + "\n")
    f.write("FRAUD DETECTION MODEL - CLASSIFICATION REPORT\n")
    f.write("=" * 60 + "\n\n")
    f.write(f"Model Accuracy: {accuracy:.4f}\n\n")
    f.write("Confusion Matrix:\n")
    f.write(str(cm) + "\n\n")
    f.write(report)

print("✅ Saved: images/classification_report.txt")

# ============ CHART 5: Feature Importance ============
print("\n📊 Creating Feature Importance Chart...")
feature_importance = model.feature_importances_
feature_names = X.columns
feature_df = pd.DataFrame({
    'Feature': feature_names,
    'Importance': feature_importance
}).sort_values('Importance', ascending=False).head(10)

fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.barh(feature_df['Feature'], feature_df['Importance'], color='#9b59b6', edgecolor='black', linewidth=1.5)

# Add value labels
for i, bar in enumerate(bars):
    width = bar.get_width()
    ax.text(width + 0.002, bar.get_y() + bar.get_height()/2.,
            f'{width:.4f}', ha='left', va='center', fontsize=9, fontweight='bold')

ax.set_xlabel('Importance Score', fontsize=12, fontweight='bold')
ax.set_title('🎯 Top 10 Feature Importance', fontsize=14, fontweight='bold')
ax.grid(axis='x', alpha=0.3, linestyle='--')

plt.tight_layout()
plt.savefig('images/feature_importance.png', dpi=300, bbox_inches='tight')
print("✅ Saved: images/feature_importance.png")
plt.close()

# ============ SUMMARY ============
print("\n" + "=" * 60)
print("✅ ALL VISUALIZATION CHARTS CREATED SUCCESSFULLY!")
print("=" * 60)
print("\n📁 Generated Images:")
print("  • images/anomaly_chart.png - Accuracy visualization")
print("  • images/confusion_matrix.png - Confusion matrix heatmap")
print("  • images/metrics_comparison.png - Performance metrics")
print("  • images/feature_importance.png - Top features")
print("  • images/classification_report.txt - Detailed report")
print("\n✨ Ready to add to README.md!")
print("=" * 60)
