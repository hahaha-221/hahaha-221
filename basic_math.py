#Tính giai thừa (n!)
def tinh_giai_thua(n):
    if n == 0 or n == 1:
        return 1
    return n * tinh_giai_thua(n - 1)

print(f"Giai thừa của 5 là: {tinh_giai_thua(5)}")

#Tính trung bình dãy số
numbers = [10, 20, 30, 40, 50]
trung_binh = sum(numbers) / len(numbers)
print(f"Giá trị trung bình: {trung_binh}")

#Tính lợi nhuận sau 12 tháng (Lãi kép)
def tinh_loi_nhuan(von, lai_suat_thang, so_thang=12):
    return von * (1 + lai_suat_thang)**so_thang

von_dau_tu = 100000000 # 100 triệu
lai_suat = 0.005        # 0.5% mỗi tháng
ket_qua = tinh_loi_nhuan(von_dau_tu, lai_suat)
print(f"Số tiền nhận được sau 12 tháng: {ket_qua:,.0f} VND")

# Bài toán: Tính lợi nhuận sau 12 tháng với lãi suất kép
von_ban_dau = 50000000  # 50 triệu VND
lai_suat_thang = 0.006  # 0.6% mỗi tháng

def tinh_lai_kep(P, r, n):
    return P * (1 + r)**n

tong_tien = tinh_lai_kep(von_ban_dau, lai_suat_thang, 12)
loi_nhuan = tong_tien - von_ban_dau

print(f"--- BÁO CÁO TÀI CHÍNH CÁ NHÂN ---")
print(f"Số tiền gốc: {von_ban_dau:,.0f} VND")
print(f"Tổng tiền nhận được sau 12 tháng: {tong_tien:,.0f} VND")
print(f"Lợi nhuận ròng: {loi_nhuan:,.0f} VND")