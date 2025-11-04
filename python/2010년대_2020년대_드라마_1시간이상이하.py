import pandas as pd
import matplotlib.pyplot as plt

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# 1️⃣ CSV 파일 불러오기
df = pd.read_csv("channelData..csv")

# 2️⃣ 방송사 드라마만 선택 (OTT 제외)
broadcast_df = df[~df['OG_NETWORK'].str.contains("Netflix|Disney|Apple|TVING|Wavve|Coupang", case=False, na=False)]

# 3️⃣ 'DURATION'을 모두 '분' 단위로 변환하기
def convert_to_minutes(duration):
    if pd.isna(duration):
        return None
    duration = str(duration).lower()
    hours = 0
    minutes = 0
    if "h" in duration:
        parts = duration.split("h")
        hours = int(parts[0].strip()) if parts[0].strip().isdigit() else 0
        if len(parts) > 1 and "min" in parts[1]:
            minutes = int(''.join(filter(str.isdigit, parts[1])))
    elif "min" in duration:
        minutes = int(''.join(filter(str.isdigit, duration)))
    return hours * 60 + minutes

broadcast_df["DURATION_MIN"] = broadcast_df["DURATION"].apply(convert_to_minutes)

# 4️⃣ 60분 기준으로 분류
broadcast_df["DURATION_TYPE"] = broadcast_df["DURATION_MIN"].apply(lambda x: "1시간 이상" if x >= 60 else "1시간 미만")

# 5️⃣ 연도별 구간 분류
era_2010s = broadcast_df[(broadcast_df["AIR_YEAR"] >= 2010) & (broadcast_df["AIR_YEAR"] <= 2019)]
era_2020s = broadcast_df[(broadcast_df["AIR_YEAR"] >= 2020) & (broadcast_df["AIR_YEAR"] <= 2022)]

# 6️⃣ 개수 세기
count_2010s = era_2010s["DURATION_TYPE"].value_counts()
count_2020s = era_2020s["DURATION_TYPE"].value_counts()

# 7️⃣ 그래프 시각화
plt.figure(figsize=(10, 5))

# 2010년대 방송사 드라마
plt.subplot(1, 2, 1)
plt.bar(count_2010s.index, count_2010s.values, color=['skyblue', 'orange'])
plt.title("2010~2019년 방송사 드라마 상영시간")
plt.xlabel("상영시간 구분")
plt.ylabel("드라마 개수")
for i, v in enumerate(count_2010s.values):
    plt.text(i, v + 1, str(v), ha='center', fontsize=10)

# 2020년대 방송사 드라마
plt.subplot(1, 2, 2)
plt.bar(count_2020s.index, count_2020s.values, color=['skyblue', 'orange'])
plt.title("2020~2022년 방송사 드라마 상영시간")
plt.xlabel("상영시간 구분")
plt.ylabel("드라마 개수")
for i, v in enumerate(count_2020s.values):
    plt.text(i, v + 1, str(v), ha='center', fontsize=10)

plt.tight_layout()
plt.show()
