# Báo Cáo Dự Án: Fraud Detection Project

Ngày: 27/05/2026

## 1. Tổng quan dự án
Dự án "Fraud Detection Project" phát triển một hệ thống phát hiện gian lận trên dữ liệu báo cáo tài chính sử dụng học máy (ML). Mục tiêu chính là phân loại các bản ghi tài chính thành "Bình thường" hoặc "Bất thường" (anomaly/fraud) và cung cấp công cụ trực quan hoá để hỗ trợ phân tích.

## 2. Dữ liệu
- Tập dữ liệu: `data/Financial Statement Anomaly Dataset.csv` (nguồn: Kaggle)
- Các đặc trưng chính: Revenue, Operating Expenses, Net Income, Cash Flow, Debt Ratio, ...
- Biến mục tiêu: `Financial_Status` (nhãn phân lớp)

## 3. Phương pháp và triển khai
- Ngôn ngữ: Python 3.11
- Thư viện chính: pandas, numpy, scikit-learn, matplotlib, seaborn, xgboost, lightgbm, streamlit
- Các mô hình triển khai thử nghiệm: RandomForestClassifier (chính), Logistic Regression, XGBoost, LightGBM
- Quy trình chung:
  1. Tiền xử lý: làm sạch dữ liệu, xử lý giá trị thiếu, chuẩn hoá nếu cần
  2. Tách features `X` và target `y`; chia tập huấn luyện/kiểm tra (80/20)
  3. Huấn luyện các mô hình và đánh giá bằng accuracy, precision, recall, F1
  4. Sinh các biểu đồ và báo cáo (confusion matrix, feature importance, metrics comparison)

## 4. Kết quả chính
- Mô hình Random Forest (mẫu) đạt accuracy khoảng 0.83–0.85 trên tập kiểm tra (ví dụ chạy thử).
- Ma trận nhầm lẫn, đồ thị so sánh các chỉ số và biểu đồ độ quan trọng đặc trưng được sinh trong thư mục `images/`:
  - `anomaly_chart.png` — Biểu đồ độ chính xác
  - `confusion_matrix.png` — Ma trận nhầm lẫn
  - `metrics_comparison.png` — So sánh Accuracy / Precision / Recall / F1
  - `feature_importance.png` — Độ quan trọng đặc trưng của Random Forest
- Báo cáo chi tiết (text) được lưu tại: `images/classification_report.txt`

> Lưu ý: Các giá trị chính xác sẽ phụ thuộc vào tiền xử lý dữ liệu và cấu hình mô hình cụ thể; báo cáo này tóm tắt kết quả mẫu đã sinh khi thử nghiệm ban đầu.

## 5. Hướng dẫn chạy và tái tạo
1. Thiết lập môi trường (Conda hoặc virtualenv):

```bash
conda env create -f environment-fraud.yml
conda activate fraud_env
pip install -r requirements.txt
```

2. Đặt file dataset trong `data/` và chạy huấn luyện:

```bash
python main.py
```

3. Chạy dashboard tương tác (tuỳ chọn):

```bash
streamlit run streamlit_app.py
```

## 6. Đánh giá, rủi ro và khuyến nghị
- Đánh giá:
  - Mô hình hiện tại cho hiệu suất hợp lý nhưng cần kiểm tra kĩ về phân bố lớp (imbalance) và xử lý mẫu bất thường.
- Rủi ro:
  - Nếu dữ liệu huấn luyện không phản ánh thực tế, mô hình có thể tạo nhiều false positives hoặc false negatives.
  - Dữ liệu nhạy cảm (tài chính) không nên được đưa lên kho mã nguồn công khai.
- Khuyến nghị:
  1. Kiểm tra phân bố nhãn và áp dụng kỹ thuật xử lý mất cân bằng (SMOTE/undersampling/weighting) nếu cần.
  2. Thử tuning hyperparameters (GridSearchCV / RandomizedSearchCV) cho Random Forest và các mô hình boosting.
  3. Thêm bước tiền xử lý đặc trưng (feature engineering) — tỷ lệ biến động, tỉ lệ thay đổi hàng năm, v.v.
  4. Lưu và versioning mô hình (`.pkl`) cùng metadata huấn luyện.
  5. Xây dựng pipeline CI để tái tạo kết quả thử nghiệm và kiểm tra thay đổi dữ liệu.

## 7. Các bước tiếp theo đề xuất
- Tích hợp kiểm thử end-to-end: từ tải dữ liệu đến báo cáo kết quả tự động
- Triển khai API nhẹ để nhận dữ liệu mới và trả về dự đoán
- Thêm logging + monitoring cho model khi chạy trong môi trường thực
- Mở rộng báo cáo: tạo notebook phân tích chi tiết trong `notebooks/` và bảng điều khiển Streamlit

---

Báo cáo này được tạo tự động từ nội dung dự án trong repository; cần cập nhật số liệu thực tế bằng cách chạy `main.py` trên dataset hiện có để ghi lại kết quả cuối cùng.