import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

# 1. Tạo dữ liệu mẫu (Giả lập 100 giao dịch kế toán)
np.random.seed(42)
normal_data = np.random.normal(size=(95, 2), loc=100)  # 95 giao dịch bình thường
outliers = np.random.uniform(low=200, high=300, size=(5, 2))  # 5 giao dịch đáng nghi
data = np.vstack([normal_data, outliers])

df = pd.DataFrame(data, columns=['Amount', 'Time_Gap'])

# 2. Huấn luyện mô hình Isolation Forest
# n_estimators: số lượng cây trong rừng
# contamination: tỷ lệ nhiễu mà bạn dự đoán (ở đây là 5%)
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
df['anomaly_score'] = model.fit_predict(df[['Amount', 'Time_Gap']])

# 3. Phân loại: 1 là bình thường, -1 là bất thường (gian lận)
df['result'] = df['anomaly_score'].map({1: 'Bình thường', -1: 'Đáng nghi'})

print("--- KẾT QUẢ PHÂN TÍCH GIAO DỊCH ---")
print(df.tail(10)) # Xem 10 dòng cuối (nơi có các điểm bất thường)

# Lọc ra danh sách gian lận
fraud_list = df[df['anomaly_score'] == -1]
print(f"\nSố lượng giao dịch cần kiểm tra lại: {len(fraud_list)}")