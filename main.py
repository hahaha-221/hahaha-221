import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Đọc dữ liệu
df = pd.read_csv("data/Financial Statement Anomaly Dataset.csv")

print("Dataset loaded successfully")
print(df.head())

# Xem tên cột
print(df.columns)