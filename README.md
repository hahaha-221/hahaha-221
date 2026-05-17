# 💰 Financial Fraud Detection Project
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Machine Learning](https://img.shields.io/badge/Machine-Learning-green)
## 📌 Giới thiệu

Dự án sử dụng Machine Learning để phát hiện các giao dịch tài chính bất thường (Fraud Detection / Anomaly Detection) trong hệ thống kế toán và báo cáo tài chính.

Mục tiêu:
- Phát hiện giao dịch đáng ngờ
- Hỗ trợ kiểm toán nội bộ
- Hỗ trợ phát hiện gian lận tài chính
- Ứng dụng AI vào lĩnh vực kế toán – kiểm toán

---

# 🧠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Ngôn ngữ | Python 3.11 |
| Machine Learning | Scikit-learn |
| Thuật toán | Isolation Forest |
| Xử lý dữ liệu | Pandas, NumPy |
| Visualization | Matplotlib, Seaborn |
| Môi trường | Anaconda |
| IDE | VSCode |
| Quản lý mã nguồn | Git & GitHub |

---

# 📂 Cấu trúc thư mục

```bash
fraud_detection_project/
│
├── data/                  # Dataset
├── outputs/               # Kết quả mô hình
├── notebooks/             # Jupyter Notebook
├── src/                   # Source code
│   ├── preprocessing.py
│   ├── model.py
│   └── visualization.py
│
├── detect_fraud.py        # File chạy chính
├── basic_math.py          # Các bài Python cơ bản
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

# 📊 Dataset sử dụng

## Financial Anomaly Dataset

Dataset chứa:
- transaction amount
- account id
- transaction type
- timestamp
- category
- anomaly label

Ứng dụng:
- phát hiện giao dịch bất thường
- fraud detection
- anomaly detection

Dataset:
https://www.kaggle.com/datasets/devondev/financial-anomaly-data

---

# ⚙️ Cài đặt môi trường

## 1️⃣ Clone project

```bash
git clone https://github.com/truzpuong/fraud_detection_project.git
```

---

## 2️⃣ Di chuyển vào thư mục project

```bash
cd fraud_detection_project
```

---

## 3️⃣ Tạo môi trường ảo bằng Anaconda

```bash
conda create -n fraud_env python=3.11
```

---

## 4️⃣ Kích hoạt môi trường

```bash
conda activate fraud_env
```

Sau khi kích hoạt thành công sẽ xuất hiện:

```bash
(fraud_env)
```

---

## 5️⃣ Cài thư viện

```bash
pip install pandas numpy matplotlib seaborn scikit-learn pyod jupyter
```

Hoặc dùng:

```bash
pip install -r requirements.txt
```

---

# ▶️ Cách chạy dự án

## Chạy file phát hiện gian lận

```bash
python detect_fraud.py
```

---

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

# 🔐 Bảo mật

Project sử dụng file `.env` để lưu:
- API key
- thông tin nhạy cảm

Ví dụ:

```env
API_KEY=your_api_key
```

File `.env` đã được thêm vào `.gitignore`.

---

# 📚 Kiến thức áp dụng

- Python cơ bản
- Data Analysis
- Machine Learning
- Fraud Detection
- GitHub
- Virtual Environment
- Financial Analytics

---

# 🚀 Hướng phát triển

Trong tương lai có thể:
- xây dựng dashboard bằng Streamlit
- dùng Deep Learning
- tích hợp dữ liệu ERP SAP
- realtime fraud detection
- triển khai trên cloud

---

# 👨‍💻 Thành viên thực hiện

- Tên sinh viên
- MSSV
- Lớp

---

# 📜 License

This project is for educational purposes.