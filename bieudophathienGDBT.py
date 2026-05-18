# ==============================================================================
# BƯỚC 1: KHỞI TẠO MÔI TRƯỜNG DỮ LIỆU GIẢ LẬP (DATA GENERATION)
# ==============================================================================
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# Thiết lập seed để kết quả chạy luôn đồng nhất
np.random.seed(42)

# Giả lập 95 giao dịch kế toán bình thường (Amount quanh mức 100)
normal_data = np.random.normal(size=(95, 2), loc=100, scale=15)

# Giả lập 5 giao dịch bất thường/đáng nghi (Amount vọt lên từ 180 đến 250)
outliers = np.random.uniform(low=180, high=250, size=(5, 2))

# Gộp dữ liệu lại thành một tập hợp 100 giao dịch
data = np.vstack([normal_data, outliers])
df = pd.DataFrame(data, columns=['Amount', 'Time_Gap'])


# ==============================================================================
# BƯỚC 2: HUẤN LUYỆN MÔ HÌNH AI PHÁT HIỆN GIAN LẬN (ISOLATION FOREST)
# ==============================================================================
# Thiết lập tỷ lệ nhiễm bẩn (contamination) = 0.05 để quét ra 5% dữ liệu dị biệt nhất
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
df['anomaly_score'] = model.fit_predict(df[['Amount', 'Time_Gap']])

# Gán nhãn kết quả phân tích dựa trên điểm anomaly score
df['result'] = df['anomaly_score'].map({1: 'Bình thường', -1: 'Đáng nghi'})


# ==============================================================================
# BƯỚC 3: XUẤT BÁO CÁO KẾT QUẢ RA MÀN HÌNH TERMINAL (LOGGING KẾT QUẢ)
# ==============================================================================
print("=" * 50)
print(" SYSTEM REPORT: DANH SÁCH CÁC GIAO DỊCH BỊ AI PHẠT THẺ ĐỎ ")
print("=" * 50)
fraud_list = df[df['anomaly_score'] == -1]
print(fraud_list[['Amount', 'Time_Gap', 'result']])
print("-" * 50)
print(f"Tổng số giao dịch cần đưa vào diện kiểm toán chuyên sâu: {len(fraud_list)}\n")


# ==============================================================================
# BƯỚC 4: VẼ BẢN ĐỒ ĐỒ THỊ TRỰC QUAN HÓA DỮ LIỆU (DATA VISUALIZATION)
# ==============================================================================
plt.figure(figsize=(10, 6))

# Lọc và vẽ các điểm giao dịch an toàn (Màu xanh dương)
normal = df[df['anomaly_score'] == 1]
plt.scatter(normal['Amount'], normal['Time_Gap'], c='#1f77b4', label='Giao dịch Bình thường', alpha=0.6)

# Lọc và vẽ các điểm giao dịch gian lận (Màu đỏ rực, kích thước to để dễ soi)
fraud = df[df['anomaly_score'] == -1]
plt.scatter(fraud['Amount'], fraud['Time_Gap'], c='red', label='Giao dịch Đáng nghi (Outliers)', s=120, edgecolors='black', zorder=5)

# Cấu hình các tiêu đề hiển thị trên biểu đồ
plt.title('BẢN ĐỒ PHÁT HIỆN GIAO DỊCH BẤT THƯỜNG (ISOLATION FOREST)', fontsize=14, fontweight='bold', pad=15)
plt.xlabel('Giá trị giao dịch (Amount)', fontsize=12)
plt.ylabel('Khoảng cách thời gian nhập liệu (Time Gap)', fontsize=12)
plt.legend(loc='upper left', fontsize=11)
plt.grid(True, linestyle='--', alpha=0.5)

# Lệnh bắt buộc kích hoạt cửa sổ biểu đồ hiển thị lên màn hình Windows
plt.savefig("images/anomaly_chart.png")
plt.show()