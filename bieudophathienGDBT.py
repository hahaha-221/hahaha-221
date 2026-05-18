# ==============================================================================
# FINANCIAL FRAUD DETECTION - ANOMALY VISUALIZATION
# Isolation Forest with Realistic Financial Transaction Simulation
# ==============================================================================

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# ==============================================================================
# 1. GENERATE REALISTIC FINANCIAL TRANSACTION DATA
# ==============================================================================

# Seed for reproducibility
np.random.seed(42)

# Simulate normal financial transactions
n_normal = 500

amount_normal = np.random.normal(
    loc=1200,
    scale=350,
    size=n_normal
)

time_gap_normal = np.random.normal(
    loc=45,
    scale=12,
    size=n_normal
)

# Simulate suspicious transactions
n_fraud = 20

amount_fraud = np.random.uniform(
    low=5000,
    high=12000,
    size=n_fraud
)

time_gap_fraud = np.random.uniform(
    low=1,
    high=8,
    size=n_fraud
)

# Combine datasets
amount = np.concatenate([amount_normal, amount_fraud])
time_gap = np.concatenate([time_gap_normal, time_gap_fraud])

# Create dataframe
df = pd.DataFrame({
    'Amount': amount,
    'Time_Gap': time_gap
})

# Remove negative values
df['Amount'] = df['Amount'].clip(lower=10)
df['Time_Gap'] = df['Time_Gap'].clip(lower=1)

# ==============================================================================
# 2. TRAIN ISOLATION FOREST MODEL
# ==============================================================================

model = IsolationForest(
    n_estimators=150,
    contamination=0.04,
    random_state=42
)

df['anomaly'] = model.fit_predict(df[['Amount', 'Time_Gap']])

# Map labels
df['Label'] = df['anomaly'].map({
    1: 'Normal Transaction',
    -1: 'Suspicious Transaction'
})

# ==============================================================================
# 3. DISPLAY DETECTED ANOMALIES
# ==============================================================================

print("=" * 60)
print(" FINANCIAL FRAUD DETECTION REPORT ")
print("=" * 60)

fraud_cases = df[df['anomaly'] == -1]

print(fraud_cases[['Amount', 'Time_Gap', 'Label']].head(10))

print("-" * 60)
print(f"Total suspicious transactions detected: {len(fraud_cases)}")
print("=" * 60)

# ==============================================================================
# 4. VISUALIZATION
# ==============================================================================

plt.figure(figsize=(12, 7))

# Normal transactions
normal = df[df['anomaly'] == 1]

plt.scatter(
    normal['Amount'],
    normal['Time_Gap'],
    s=35,
    alpha=0.55,
    label='Normal Transactions'
)

# Fraud transactions
fraud = df[df['anomaly'] == -1]

plt.scatter(
    fraud['Amount'],
    fraud['Time_Gap'],
    s=90,
    edgecolors='black',
    linewidths=1,
    label='Suspicious Transactions',
    zorder=5
)

# Titles and labels
plt.title(
    'Financial Transaction Anomaly Detection',
    fontsize=16,
    fontweight='bold',
    pad=18
)

plt.xlabel(
    'Transaction Amount ($)',
    fontsize=12
)

plt.ylabel(
    'Transaction Time Gap',
    fontsize=12
)

# Grid styling
plt.grid(
    linestyle='--',
    alpha=0.25
)

# Legend
plt.legend(
    fontsize=11,
    frameon=True
)

# Clean layout
plt.tight_layout()

# Save chart
plt.savefig(
    "images/anomaly_chart.png",
    dpi=300,
    bbox_inches='tight'
)

plt.show()