import pandas as pd
import matplotlib.pyplot as plt

# ✅ 한글 깨짐 방지 설정
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# ✅ 1️⃣ CSV 불러오기
df = pd.read_csv("channelData..csv")

# ✅ 2️⃣ 필요한 열만 추출 후 결측치 제거
df = df[['AIR_YEAR', 'DURATION', 'OG_NETWORK']].dropna()

# ✅ 3️⃣ "1 hr. 10 min." → 70 으로 변환하는 함수
def to_minutes(duration):
    duration = str(duration)
    hr, mn = 0, 0
    if "hr" in duration:
        try:
            hr = int(duration.split("hr")[0].strip().split()[-1])
        except:
            hr = 0
    if "min" in duration:
        try:
            mn_part = duration.split("min")[0].split()[-1]
            mn = int(''.join(ch for ch in mn_part if ch.isdigit()) or 0)
        except:
            mn = 0
    return hr * 60 + mn

df["DURATION_MIN"] = df["DURATION"].apply(to_minutes)

# ✅ 4️⃣ OTT / TV 구분
ott_keywords = ["Netflix", "Watcha", "Wavve", "TVING", "Disney+", "Coupang", "Apple"]
df["구분"] = df["OG_NETWORK"].apply(
    lambda x: "OTT" if any(k.lower() in str(x).lower() for k in ott_keywords) else "TV"
)

# ✅ 5️⃣ 1시간 이상 / 이하 분류
df["시간구분"] = df["DURATION_MIN"].apply(lambda x: "1시간 이상" if x >= 60 else "1시간 이하")

# ✅ 6️⃣ 시대 구분 (2010년대 / 2020년대)
def classify_decade(y):
    if 2010 <= y <= 2019:
        return "2010년대"
    elif 2020 <= y <= 2022:
        return "2020년대"
    else:
        return None

df["시대구분"] = df["AIR_YEAR"].apply(classify_decade)
df = df.dropna(subset=["시대구분"])

# ✅ 7️⃣ OTT와 TV를 따로 집계
ott_data = df[df["구분"] == "OTT"].groupby(["시대구분", "시간구분"]).size().unstack(fill_value=0)
tv_data = df[df["구분"] == "TV"].groupby(["시대구분", "시간구분"]).size().unstack(fill_value=0)

print("✅ OTT 드라마 결과\n", ott_data, "\n")
print("✅ TV 드라마 결과\n", tv_data, "\n")

# ✅ 8️⃣ 그래프 2개 나란히 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# OTT 그래프
ott_data.plot(kind='bar', ax=axes[0], color=['skyblue', 'lightcoral'], edgecolor='black')
axes[0].set_title("OTT 드라마 (2010년대 vs 2020년대)")
axes[0].set_xlabel("시대 구분")
axes[0].set_ylabel("드라마 개수")
axes[0].legend(title="상영시간")
axes[0].set_xticklabels(ott_data.index, rotation=0)
for container in axes[0].containers:
    axes[0].bar_label(container, fmt='%d', label_type='edge', fontsize=9)

# TV 그래프
tv_data.plot(kind='bar', ax=axes[1], color=['skyblue', 'lightcoral'], edgecolor='black')
axes[1].set_title("TV 드라마 (2010년대 vs 2020년대)")
axes[1].set_xlabel("시대 구분")
axes[1].legend(title="상영시간")
axes[1].set_xticklabels(tv_data.index, rotation=0)
for container in axes[1].containers:
    axes[1].bar_label(container, fmt='%d', label_type='edge', fontsize=9)

plt.suptitle("📺 OTT vs TV 드라마 상영시간 비교", fontsize=14, y=1.05)
plt.tight_layout()
plt.show()
