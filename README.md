![Banner](images/banner.png)

# 💰 Fraud Detection Project | Dự Án Phát Hiện Gian Lận Tài Chính

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Machine Learning](https://img.shields.io/badge/Machine-Learning-green)
![Fraud Detection](https://img.shields.io/badge/Fraud-Detection-red)
![Status](https://img.shields.io/badge/Status-Ready-brightgreen)

---

## 📖 Table of Contents | Mục Lục

- [English](#english)
- [Tiếng Việt](#tiếng-việt)

---

# ENGLISH

## 🎯 Project Overview

This project builds a Financial Fraud Detection system using Machine Learning to classify and detect anomalous financial records and suspicious accounting activities. The system applies multiple classification algorithms to identify irregular financial patterns that may indicate fraud or accounting manipulation.

### Objectives

- Classify financial statement status (Normal/Abnormal)
- Detect fraudulent or erroneous financial records
- Provide analytical interface and data visualization
- Compare multiple machine learning models
- Generate detailed classification reports

### Key Features

- **Multiple ML Models**: Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM
- **Streamlit Web Interface**: Interactive dashboard for data exploration and model evaluation
- **Data Visualization**: Correlation heatmap, scatter matrix, histograms, confusion matrix
- **Model Comparison**: Accuracy, Precision, Recall, F1-Score, AUC-ROC metrics
- **Local Dataset Support**: Works with CSV files in `data/` directory
- **Model Persistence**: Trained models saved as `.pkl` files

### Technologies Used

| Component | Technology |
|-----------|-----------|
| Language | Python 3.11 |
| Data Processing | Pandas, NumPy |
| ML Framework | Scikit-learn |
| Web Framework | Streamlit |
| Boosting | XGBoost, LightGBM |
| Visualization | Matplotlib, Seaborn, Plotly |
| Environment | Conda / Virtualenv |

## 📁 Project Structure

```
fraud_detection_project/
├── data/
│   └── Financial Statement Anomaly Dataset.csv
├── images/                    # Readme images
├── notebooks/                 # Jupyter notebooks
├── src/                      # Source code modules
├── main.py                   # Main training script
├── streamlit_app.py          # Streamlit dashboard
├── environment-fraud.yml     # Conda environment
├── requirements.txt          # Pip dependencies
└── README.md
```

## 📊 Dataset

**Financial Statement Anomaly Dataset**

Source: [Kaggle Dataset](https://www.kaggle.com/datasets/zara2099/financial-statement-anomaly-dataset)

Features:
- Revenue
- Operating Expenses
- Net Income
- Cash Flow
- Debt Ratio
- Financial_Status (target variable)

**Note**: Place the dataset CSV file in `data/` directory before running applications.

## ⚙️ Installation & Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/truzpuong/fraud_detection_project.git
cd fraud_detection_project
```

### Step 2: Create Environment (Conda)

```bash
conda env create -f environment-fraud.yml
conda activate fraud_env
```

**Alternative (Pip with Virtualenv)**:

```bash
python -m venv .venv
.\.venv\Scripts\activate        # Windows
source .venv/bin/activate       # Linux/Mac
pip install -r requirements.txt
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Running the Project

### Train Model and Save Results

```bash
python main.py
```

Output:
- Model accuracy metrics
- Confusion matrix
- Classification report
- Saved model: `fraud_model.pkl`

### Launch Streamlit Dashboard

```bash
streamlit run streamlit_app.py
```

Access at: `http://localhost:8501`

## 📝 Notes

- `main.py`: Trains RandomForestClassifier on the dataset and saves results
- `streamlit_app.py`: Interactive web dashboard for data analysis and model comparison
- If you encounter missing library errors, reinstall dependencies: `pip install -r requirements.txt`
- Trained models are cached for fast loading

## 🔄 Workflow

1. Place dataset in `data/` directory
2. Set up environment (Conda or Virtualenv)
3. Run `python main.py` to train the model
4. Run `streamlit run streamlit_app.py` to view interactive dashboard
5. Analyze results and model performance metrics

## ⚠️ Important Notes for GitHub

- `.gitignore` excludes: `__pycache__/`, `*.pyc`, `venv/`, `.venv/`, `*.pkl`
- Never commit sensitive data or API keys
- Keep README updated with setup instructions

---

# TIẾNG VIỆT

## 🎯 Tổng Quan Dự Án

Dự án này xây dựng hệ thống Phát Hiện Gian Lận Tài Chính bằng Machine Learning để phân loại và phát hiện các bản ghi tài chính bất thường. Hệ thống áp dụng nhiều thuật toán phân loại để xác định các mẫu tài chính không bình thường có thể cho thấy gian lận hoặc thao túng kế toán.

### Mục Tiêu

- Phân loại tình trạng báo cáo tài chính (Bình thường/Bất thường)
- Phát hiện các bản ghi gian lận hoặc sai sót
- Cung cấp giao diện phân tích và trực quan hoá dữ liệu
- So sánh hiệu suất nhiều mô hình ML
- Tạo báo cáo phân loại chi tiết

### Tính Năng Chính

- **Nhiều Mô Hình ML**: Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM
- **Giao Diện Streamlit**: Dashboard tương tác để khám phá dữ liệu và đánh giá mô hình
- **Trực Quan Hoá**: Ma trận tương quan, scatter plot, histogram, confusion matrix
- **So Sánh Mô Hình**: Accuracy, Precision, Recall, F1-Score, AUC-ROC
- **Hỗ Trợ Dataset Cục Bộ**: Làm việc với file CSV trong thư mục `data/`
- **Lưu Mô Hình**: Mô hình được lưu dưới dạng file `.pkl`

### Công Nghệ Sử Dụng

| Thành Phần | Công Nghệ |
|-----------|-----------|
| Ngôn Ngữ | Python 3.11 |
| Xử Lý Dữ Liệu | Pandas, NumPy |
| Framework ML | Scikit-learn |
| Framework Web | Streamlit |
| Boosting | XGBoost, LightGBM |
| Trực Quan Hoá | Matplotlib, Seaborn, Plotly |
| Môi Trường | Conda / Virtualenv |

## 📁 Cấu Trúc Dự Án

```
fraud_detection_project/
├── data/
│   └── Financial Statement Anomaly Dataset.csv
├── images/                    # Hình ảnh README
├── notebooks/                 # Jupyter notebooks
├── src/                      # Module mã nguồn
├── main.py                   # Script huấn luyện chính
├── streamlit_app.py          # Dashboard Streamlit
├── environment-fraud.yml     # Môi trường Conda
├── requirements.txt          # Dependencies pip
└── README.md
```

## 📊 Dataset

**Financial Statement Anomaly Dataset**

Nguồn: [Kaggle Dataset](https://www.kaggle.com/datasets/zara2099/financial-statement-anomaly-dataset)

Các thuộc tính:
- Doanh Thu (Revenue)
- Chi Phí Hoạt Động (Operating Expenses)
- Lợi Nhuận Ròng (Net Income)
- Dòng Tiền Mặt (Cash Flow)
- Tỷ Lệ Nợ (Debt Ratio)
- Tình Trạng Tài Chính (Financial_Status - biến mục tiêu)

**Lưu Ý**: Đặt file dataset CSV vào thư mục `data/` trước khi chạy ứng dụng.

## ⚙️ Cài Đặt & Thiết Lập

### Bước 1: Clone Repository

```bash
git clone https://github.com/truzpuong/fraud_detection_project.git
cd fraud_detection_project
```

### Bước 2: Tạo Môi Trường (Conda)

```bash
conda env create -f environment-fraud.yml
conda activate fraud_env
```

**Cách Khác (Pip với Virtualenv)**:

```bash
python -m venv .venv
.\.venv\Scripts\activate        # Windows
source .venv/bin/activate       # Linux/Mac
pip install -r requirements.txt
```

### Bước 3: Cài Đặt Dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Chạy Dự Án

### Huấn Luyện Mô Hình Và Lưu Kết Quả

```bash
python main.py
```

Kết Quả:
- Độ chính xác của mô hình
- Ma trận nhầm lẫn
- Báo cáo phân loại
- Lưu mô hình: `fraud_model.pkl`

### Khởi Động Dashboard Streamlit

```bash
streamlit run streamlit_app.py
```

Truy Cập Tại: `http://localhost:8501`

## 📝 Ghi Chú

- `main.py`: Huấn luyện RandomForestClassifier trên dataset và lưu kết quả
- `streamlit_app.py`: Dashboard web tương tác để phân tích dữ liệu và so sánh mô hình
- Nếu gặp lỗi thư viện bị thiếu, cài lại dependencies: `pip install -r requirements.txt`
- Mô hình được cache để tải nhanh hơn

## 🔄 Luồng Công Việc

1. Đặt dataset vào thư mục `data/`
2. Thiết lập môi trường (Conda hoặc Virtualenv)
3. Chạy `python main.py` để huấn luyện mô hình
4. Chạy `streamlit run streamlit_app.py` để xem dashboard tương tác
5. Phân tích kết quả và các chỉ số hiệu suất mô hình

## ⚠️ Lưu Ý Quan Trọng Cho GitHub

- `.gitignore` loại trừ: `__pycache__/`, `*.pyc`, `venv/`, `.venv/`, `*.pkl`
- Không commit dữ liệu nhạy cảm hoặc API key
- Luôn cập nhật README với hướng dẫn cài đặt

---

## 📜 License | Giấy Phép

This project is open source. Feel free to use and modify. | Dự án này mã nguồn mở. Tự do sử dụng và chỉnh sửa.


## Chạy Jupyter Notebook

```bash
jupyter notebook
```

---

# 🤖 Thuật toán sử dụng

## Isolation Forest

Isolation Forest là thuật toán Machine Learning dùng để phát hiện:
- outlier
- anomaly
- fraud transaction

Ý tưởng:
- dữ liệu bất thường sẽ dễ bị “cô lập”
- anomaly có path ngắn hơn dữ liệu bình thường

Ưu điểm:
- chạy nhanh
- hiệu quả với dữ liệu lớn
- không cần label quá nhiều

---

# 📈 Quy trình xử lý dữ liệu

1. Load dataset
2. Làm sạch dữ liệu
3. Encode dữ liệu categorical
4. Huấn luyện mô hình
5. Dự đoán anomaly
6. Visualization kết quả

---

# 🧪 Ví dụ code

## Huấn luyện mô hình

```python
from sklearn.ensemble import IsolationForest

model = IsolationForest(
    contamination=0.02,
    random_state=42
)

model.fit(X)
```

---

# 📊 Kết quả đạt được

Mô hình có thể:
- phát hiện giao dịch bất thường
- phân loại transaction đáng ngờ
- hỗ trợ kiểm toán tài chính

Ví dụ:
- giao dịch giá trị quá lớn
- giao dịch khác pattern thông thường
- transaction bất thường theo thời gian

---

# 🔐 Environment Variables (bảo mật)

Project sử dụng file `.env` để lưu:
- API key
- thông tin nhạy cảm

Ví dụ:

```env
API_KEY=your_api_key
```

File `.env` đã được thêm vào `.gitignore`.

---

# 🛠️ Tech Stack

- Python
- Pandas
- NumPy
- Matplotlib
- Scikit-learn (Machine Learning)
- Anaconda
- VSCode
- GitHub

---

# 🚀 Future Improvements

- Real-time fraud detection
- Streamlit dashboard integration
- Deep Learning anomaly models
- ERP/SAP financial integration
- Cloud deployment
- Explainable AI (XAI)

---

# 🖥️ Output Example

```bash
Loading dataset...

Training model...

Anomaly transactions detected: 42

Accuracy: 96%
```
# 📈 Anomaly Detection Result

![Anomaly Chart](images/anomaly_chart.png)
# 🔄 Workflow

![Workflow](images/workflow.png)

---
