import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc

# ✅ 0️⃣ 한글 폰트 설정 (Windows 기준, 맥/리눅스는 따로 설정 가능)
plt.rcParams['font.family'] = 'Malgun Gothic'  # 윈도우는 맑은 고딕
plt.rcParams['axes.unicode_minus'] = False     # 마이너스 깨짐 방지

# 1️⃣ CSV 파일 불러오기
df = pd.read_csv("channelData..csv")

# 2️⃣ 필요한 열만 선택
df = df[["AIR_YEAR", "DURATION", "PRODUCTION_CO"]]

# 3️⃣ 상영시간 숫자만 추출 (예: "52 min." → 52)
df["DURATION_MIN"] = df["DURATION"].str.extract(r"(\d+)").astype(float)

# 4️⃣ 연도 구간 분류 (2003~2019, 2020~2022)
def classify_period(year):
    if 2003 <= year <= 2019:
        return "2003~2019"
    elif 2020 <= year <= 2022:
        return "2020~2022"
    else:
        return "기타"

df["PERIOD"] = df["AIR_YEAR"].apply(classify_period)

# 5️⃣ 상영시간 기준 분류 (60분 이상 / 미만)
df["LENGTH_TYPE"] = df["DURATION_MIN"].apply(lambda x: "1시간 이상" if x >= 60 else "1시간 미만")

# 6️⃣ 그룹별 개수 세기
result = df.groupby(["PERIOD", "LENGTH_TYPE"]).size().unstack(fill_value=0)

# 7️⃣ 결과 확인 (콘솔 출력)
print(result)

# 8️⃣ 시각화
ax = result.plot(
    kind="bar",
    figsize=(9, 6),
    color=["#6FB1FC", "#F26C63"],
    edgecolor="black"
)

# 그래프 제목, 축 라벨 등 설정
plt.title("연도별(2003~2019 vs 2020~2022) 드라마 상영시간 비교", fontsize=14, pad=15)
plt.ylabel("드라마 개수", fontsize=12)
plt.xlabel("연도 구간", fontsize=12)
plt.xticks(rotation=0)
plt.legend(title="상영시간 구분", fontsize=10, title_fontsize=11, loc="upper right")

# 9️⃣ 막대 위에 개수 표시
for container in ax.containers:
    ax.bar_label(container, fmt='%d', label_type='edge', fontsize=10)

# 여백 자동 조정
plt.tight_layout()

# 그래프 출력
plt.show()


