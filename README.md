![Banner](images/banner.png)
# 💰 Fraud Detection Project
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Machine Learning](https://img.shields.io/badge/Machine-Learning-green)
![Fraud Detection](https://img.shields.io/badge/Fraud-Detection-red)
![Status](https://img.shields.io/badge/Status-Ready-brightgreen)

## Mục tiêu dự án

Dự án này xây dựng một hệ thống phát hiện gian lận tài chính bằng Machine Learning, sử dụng dữ liệu báo cáo tài chính để phân loại các bản ghi bất thường.

- Phân loại tình trạng tài chính của báo cáo
- Phát hiện các trường hợp gian lận hoặc sai sót
- Cung cấp giao diện phân tích và trực quan hoá
- Hỗ trợ đánh giá mô hình và đối chiếu kết quả

## Tính năng chính

- Huấn luyện mô hình phân loại với `RandomForestClassifier`
- Giao diện Streamlit để quan sát dữ liệu và kết quả
- So sánh nhiều mô hình ML (Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM)
- Trực quan hoá phân phối dữ liệu, ma trận nhầm lẫn, và báo cáo phân loại
- Hỗ trợ dataset CSV cục bộ trong thư mục `data/`

## Công nghệ sử dụng

- Python 3.11
- Pandas, NumPy
- Scikit-learn
- Streamlit
- XGBoost, LightGBM
- Matplotlib, Seaborn, Plotly

## Cấu trúc thư mục

```bash
fraud_detection_project/
├── data/
│   └── Financial Statement Anomaly Dataset.csv
├── images/
├── notebooks/
├── src/
├── main.py
├── streamlit_app.py
├── environment-fraud.yml
├── requirements.txt
└── README.md
```

## Dataset

Dữ liệu chính được lưu trong `data/Financial Statement Anomaly Dataset.csv`.

Nếu bạn cần tải lại dataset, có thể sử dụng nguồn sau:

- Kaggle: https://www.kaggle.com/datasets/zara2099/financial-statement-anomaly-dataset

> Lưu ý: Nếu dataset chưa có trong thư mục `data/`, hãy đặt file CSV vào `data/` trước khi chạy ứng dụng.

---

## Cài đặt nhanh

### 1. Clone repository

```bash
git clone https://github.com/truzpuong/fraud_detection_project.git
cd fraud_detection_project
```

### 2. Tạo môi trường (Conda)

```bash
conda env create -f environment-fraud.yml
conda activate fraud_env
```

Nếu bạn muốn dùng pip:

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Cài đặt thư viện

```bash
pip install -r requirements.txt
```

---

## Cách chạy

### Chạy script huấn luyện và lưu mô hình

```bash
python main.py
```

### Chạy giao diện Streamlit

```bash
streamlit run streamlit_app.py
```

---

## Ghi chú

- `main.py` đọc dữ liệu từ `data/Financial Statement Anomaly Dataset.csv`, huấn luyện `RandomForestClassifier`, in báo cáo đánh giá và lưu mô hình thành `fraud_model.pkl`.
- `streamlit_app.py` là ứng dụng web để trực quan hoá dữ liệu và so sánh hiệu suất các mô hình.
- Nếu gặp lỗi thiếu thư viện, chạy lại `pip install -r requirements.txt` hoặc kiểm tra môi trường ảo.

---

## Luồng công việc

1. Chuẩn bị dữ liệu trong `data/`
2. Cài đặt môi trường
3. Chạy `python main.py` để huấn luyện mô hình
4. Chạy `streamlit run streamlit_app.py` để mở giao diện phân tích

---

## Thông tin thêm

Nếu bạn muốn đưa dự án lên GitHub, đảm bảo:

- Thêm `.gitignore` để loại trừ `__pycache__/`, `*.pyc`, `venv/`, `.venv/`, và file nhạy cảm
- Không đẩy dữ liệu nhạy cảm hoặc API key
- Giữ `README.md` rõ ràng và đầy đủ hướng dẫn cài đặt


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
