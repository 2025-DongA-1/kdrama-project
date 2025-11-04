import pandas as pd
import matplotlib.pyplot as plt

# ✅ 한글 깨짐 방지
plt.rcParams['font.family'] = 'Malgun Gothic'  # 윈도우용
plt.rcParams['axes.unicode_minus'] = False     # 마이너스 깨짐 방지

# ✅ 1️⃣ CSV 불러오기
df = pd.read_csv("channelData..csv")

# ✅ 2️⃣ 결측치 제거 (공백 데이터 방지)
df = df.dropna(subset=['DURATION', 'AIR_YEAR', 'OG_NETWORK'])

# ✅ 3️⃣ 상영시간 문자열에서 숫자만 추출 ("1 hr. 15 min." → 75)
def to_minutes(duration):
    duration = str(duration)
    hr = 0
    mn = 0
    if 'hr' in duration:
        hr_part = duration.split('hr')[0].strip()
        hr = int(''.join([ch for ch in hr_part if ch.isdigit()]) or 0)
    if 'min' in duration:
        mn_part = duration.split('min')[0].split()[-1]
        mn = int(''.join([ch for ch in mn_part if ch.isdigit()]) or 0)
    return hr * 60 + mn

df['DURATION_MIN'] = df['DURATION'].apply(to_minutes)

# ✅ 4️⃣ OTT 플랫폼만 필터링
ott_list = ['Netflix', 'Disney+', 'Watcha', 'Wavve', 'TVING', 'Coupang', 'Apple']
df_ott = df[df['OG_NETWORK'].astype(str).str.contains('|'.join(ott_list), case=False, na=False)]

# ✅ 5️⃣ 상영시간 분류
df_ott['시간구분'] = df_ott['DURATION_MIN'].apply(lambda x: '1시간 이상' if x >= 60 else '1시간 미만')

# ✅ 6️⃣ 시대 구분
def classify_decade(year):
    if 2010 <= year <= 2019:
        return '2010년대'
    elif 2020 <= year <= 2022:
        return '2020년대'
    else:
        return None

df_ott['시대구분'] = df_ott['AIR_YEAR'].apply(classify_decade)
df_ott = df_ott.dropna(subset=['시대구분'])

# ✅ 7️⃣ 집계 (시대구분 × 시간구분)
result = df_ott.groupby(['시대구분', '시간구분']).size().unstack(fill_value=0)

print("✅ OTT 드라마 상영시간 분류 결과")
print(result)

# ✅ 8️⃣ 시각화
result.plot(kind='bar', color=['skyblue', 'lightcoral'], edgecolor='black')

plt.title('OTT 드라마 방영시간 비교 (2010년대 vs 2020년대)')
plt.xlabel('시대구분')
plt.ylabel('드라마 수')
plt.xticks(rotation=0)
plt.legend(title='상영시간')
plt.tight_layout()
plt.show()
