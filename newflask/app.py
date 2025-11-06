"""
Flask 기반 드라마 데이터 시각화 웹 애플리케이션
- 2010년대와 2020년대 드라마 데이터를 분석
- TV 채널별, OTT 플랫폼별 드라마 통계 제공
- Chart.js를 위한 JSON API 엔드포인트 제공
"""

from flask import Flask, render_template, jsonify
import pandas as pd
import json

# Flask 애플리케이션 인스턴스 생성
app = Flask(__name__)

# ============================================
# 데이터 로드 및 전처리
# ============================================

# CSV 파일에서 드라마 데이터 불러오기
data123 = pd.read_csv('./channelData.CSV')
data123['AIR_ON'] = data123['AIR_ON'].replace('Sunday,Saturday', 'Saturday,Sunday')
# CSV 파일에서 장르 하나씩 데이터 나누기
data123['MAIN_GENRE'] = data123['GENRE'].str.split(',').str[0]

# DRAMA_PK 컬럼 제거 (Primary Key로 분석에 불필요)
data = data123.drop('DRAMA_PK', axis=1)

# ============================================
# 연도별 데이터 분리
# ============================================

# 2010년대 데이터 (2010~2019년)
data2010 = data[data['AIR_YEAR'] < 2020]

# 2020년대 데이터 (2020년 이후)
data2020 = data[data['AIR_YEAR'] >= 2020]

# ============================================
# TV 채널 데이터 필터링
# ============================================

# 2020년대 주요 TV 채널 드라마
# KBS2, SBS, MBC: 지상파 3사
# jTBC, tvN, OCN: 주요 케이블 채널
tv2020 = data2020[
    (data2020['OG_NETWORK'] == 'KBS2') | 
    (data2020['OG_NETWORK'] == 'SBS') | 
    (data2020['OG_NETWORK'] == 'MBC') | 
    (data2020['OG_NETWORK'] == 'jTBC') | 
    (data2020['OG_NETWORK'] == 'tvN') | 
    (data2020['OG_NETWORK'] == 'OCN')
]

# 2010년대 주요 TV 채널 드라마
tv2010 = data2010[
    (data2010['OG_NETWORK'] == 'KBS2') | 
    (data2010['OG_NETWORK'] == 'SBS') | 
    (data2010['OG_NETWORK'] == 'MBC') | 
    (data2010['OG_NETWORK'] == 'jTBC') | 
    (data2010['OG_NETWORK'] == 'tvN') | 
    (data2010['OG_NETWORK'] == 'OCN')
]

# ============================================
# OTT 플랫폼 데이터 필터링
# ============================================

# 2010년대 OTT 플랫폼 드라마
# Netflix, Naver TV Cast만 존재
ott2010 = data2010[
    (data2010['OG_NETWORK'] == 'Netflix') | 
    (data2010['OG_NETWORK'] == 'Naver TV Cast')
]

# 2020년대 OTT 플랫폼 드라마
# 다양한 플랫폼 등장: Netflix, Kakao, Wavve, YouTube, Apple TV+, Disney+ 등
ott2020 = data2020[
    (data2020['OG_NETWORK'] == 'Netflix') | 
    (data2020['OG_NETWORK'] == 'Daum Kakao TV') | 
    (data2020['OG_NETWORK'] == 'Wavve') | 
    (data2020['OG_NETWORK'] == 'YouTube') | 
    (data2020['OG_NETWORK'] == 'Olleh TV') | 
    (data2020['OG_NETWORK'] == 'Apple TV+') | 
    (data2020['OG_NETWORK'] == 'Disney+')
]

# ============================================
# 전체 데이터 (마이너 채널 제외)
# ============================================

# 2010년대 전체 데이터 (분석에서 제외할 마이너 채널 필터링)
# Viki, MBN, TV Chosun, vLive 제외
all2010 = data2010[
    (data2010['OG_NETWORK'] != 'Viki') & 
    (data2010['OG_NETWORK'] != 'MBN') & 
    (data2010['OG_NETWORK'] != 'TV Chosun') & 
    (data2010['OG_NETWORK'] != 'vLive')
]

# 2020년대 전체 데이터 (마이너 채널 제외)
# ViuTv, Viki, iQiyi, ENA, Hulu, Channel A 제외
all2020 = data2020[
    (data2020['OG_NETWORK'] != 'ViuTV') & 
    (data2020['OG_NETWORK'] != 'Viki') & 
    (data2020['OG_NETWORK'] != 'iQiyi') & 
    (data2020['OG_NETWORK'] != 'ENA') & 
    (data2020['OG_NETWORK'] != 'Hulu') & 
    (data2020['OG_NETWORK'] != 'Channel A')
]

# ============================================
# 웹 페이지 라우트
# ============================================

@app.route('/')
def index():
    """메인 페이지 렌더링"""
    return render_template('index.html')


@app.route('/tv_count')
def comparison():
    """tv 채널별 드라마 수 페이지"""
    return render_template('tv_count.html')


@app.route('/ott_count')
def ottdrama():
    """OTT 채널별 드라마 수 페이지"""
    return render_template('ott_count.html')


@app.route('/all_count')
def alldrama():
    """전체 채널별 드라마 수 페이지"""
    return render_template('all_count.html')


@app.route('/tv_date')
def dramadate():
    """TV 방영 요일 페이지"""
    return render_template('tv_date.html')


@app.route('/ott_date')
def ottdate():
    """OTT 방영 요일 페이지"""
    return render_template('ott_date.html')


@app.route('/all_date')
def alldate():
    """전체 방영 요일 페이지"""
    return render_template('all_date.html')

@app.route('/tv_runningtime')
def project():
    """tv 러닝타임 페이지"""
    return render_template('tv_runningtime.html')

@app.route('/ott_runningtime')
def project2():
    """ott 러닝타임 페이지"""
    return render_template('ott_runningtime.html')

@app.route('/all_runningtime')
def project3():
    """전체 러닝타임 페이지"""
    return render_template('all_runningtime.html')

@app.route('/tv_genre')
def dramagen():
    """tv 장르 수 페이지"""
    return render_template('tv_genre.html')

@app.route('/ott_genre')
def ottgen():
    """ott 장르 수 페이지"""
    return render_template('ott_genre.html')

@app.route('/all_genre')
def allgen():
    """전체 장르 수 페이지"""
    return render_template('all_genre.html')

@app.route('/tv_rating')
def brodchart():
    """tv 평점 페이지"""
    return render_template('tv_rating.html')

@app.route('/ott_rating')
def ottchart():
    """ott 평점 페이지"""
    return render_template('ott_rating.html')

@app.route('/all_rating')
def brodcharttotal():
    """전체 평점 페이지"""
    return render_template('all_rating.html')

# ============================================
# API 엔드포인트 - TV 채널별 드라마 수
# ============================================

@app.route('/api/bar-data-2010')
def age2010():
    """
    2010년대 TV 채널별 드라마 수 데이터 반환
    
    Returns:
        JSON: {
            'labels': ['KBS2', 'SBS', ...],  # 채널명 리스트
            'values': [120, 95, ...]          # 드라마 개수 리스트
        }
    """
    # OG_NETWORK 컬럼의 값 개수 집계 (내림차순 정렬)
    rs2010 = tv2010['OG_NETWORK'].value_counts()
    
    # 인덱스(채널명)를 리스트로 변환
    labels = rs2010.index.tolist()
    
    # 값(드라마 수)을 리스트로 변환
    values = rs2010.values.tolist()

    # JSON 형식으로 반환할 딕셔너리 생성
    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


@app.route('/api/bar-data-2020')
def age2020():
    """
    2020년대 TV 채널별 드라마 수 데이터 반환
    
    Returns:
        JSON: 채널명(labels)과 드라마 개수(values)
    """
    rs2020 = tv2020['OG_NETWORK'].value_counts()
    labels = rs2020.index.tolist()
    values = rs2020.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - OTT 플랫폼별 드라마 수
# ============================================

@app.route('/api/bar-ott-2010')
def ottd2010():
    """
    2010년대 OTT 플랫폼별 드라마 수 데이터 반환
    
    Returns:
        JSON: 플랫폼명(labels)과 드라마 개수(values)
    """
    rso2010 = ott2010['OG_NETWORK'].value_counts()
    labels = rso2010.index.tolist()
    values = rso2010.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


@app.route('/api/bar-ott-2020')
def ottd2020():
    """
    2020년대 OTT 플랫폼별 드라마 수 데이터 반환
    
    Returns:
        JSON: 플랫폼명(labels)과 드라마 개수(values)
    """
    rso2020 = ott2020['OG_NETWORK'].value_counts()
    labels = rso2020.index.tolist()
    values = rso2020.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - 전체 네트워크별 비율 (파이 차트용)
# ============================================

@app.route('/api/pie-data-2010')
def ageall2010():
    """
    2010년대 전체 네트워크별 드라마 비율 데이터 반환
    파이 차트 생성을 위한 색상 정보 포함
    
    Returns:
        JSON: {
            'labels': 네트워크명 리스트,
            'values': 드라마 개수 리스트,
            'backgroundColor': 색상 코드 리스트
        }
    """
    ageall2010 = all2010['OG_NETWORK'].value_counts()
    labels = ageall2010.index.tolist()
    values = ageall2010.values.tolist()

    # 파이 차트 세그먼트별 색상 정의 (RGBA 형식, 투명도 0.7)
    colors = [
        'rgba(255, 99, 132, 0.7)',    # 빨강
        'rgba(54, 162, 235, 0.7)',    # 파랑
        'rgba(255, 206, 86, 0.7)',    # 노랑
        'rgba(75, 192, 192, 0.7)',    # 청록
        'rgba(153, 102, 255, 0.7)',   # 보라
        'rgba(255, 159, 64, 0.7)',    # 주황
        'rgba(201, 203, 207, 0.7)',   # 회색
        'rgba(255, 0, 255, 0.7)',     # 마젠타
        'rgba(0, 255, 255, 0.7)',     # 시안
        'rgba(128, 128, 0, 0.7)'      # 올리브
    ]

    # 실제 레이블 개수만큼만 색상 배열 슬라이싱
    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


@app.route('/api/pie-data-2020')
def ageall2020():
    """
    2020년대 전체 네트워크별 드라마 비율 데이터 반환
    
    Returns:
        JSON: 네트워크명, 드라마 개수, 색상 정보
    """
    ageall2020 = all2020['OG_NETWORK'].value_counts()
    labels = ageall2020.index.tolist()
    values = ageall2020.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - TV 드라마 방영 시기별 비율
# ============================================

@app.route('/api/pie-tv-2010')
def tvdate2010():
    """
    2010년대 TV 드라마 방영 시기별 비율 데이터 반환
    AIR_ON 컬럼: 방영 요일 또는 시간대 정보
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    tvd2010 = tv2010['AIR_ON'].value_counts()
    labels = tvd2010.index.tolist()
    values = tvd2010.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


@app.route('/api/pie-tv-2020')
def tvdate2020():
    """
    2020년대 TV 드라마 방영 시기별 비율 데이터 반환
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    tvd2020 = tv2020['AIR_ON'].value_counts()
    labels = tvd2020.index.tolist()
    values = tvd2020.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - OTT 드라마 방영 시기별 비율
# ============================================

@app.route('/api/pie-ott-2010')
def ottdate2010():
    """
    2010년대 OTT 드라마 방영 시기별 비율 데이터 반환
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    ottd2010 = ott2010['AIR_ON'].value_counts()
    labels = ottd2010.index.tolist()
    values = ottd2010.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


@app.route('/api/pie-ott-2020')
def ottdate2020():
    """
    2020년대 OTT 드라마 방영 시기별 비율 데이터 반환
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    ottd2020 = ott2020['AIR_ON'].value_counts()
    labels = ottd2020.index.tolist()
    values = ottd2020.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - 전체 드라마 방영 시기별 비율
# ============================================

@app.route('/api/pie-alldate-2010')
def alldate2010():
    """
    2010년대 전체(TV+OTT) 드라마 방영 시기별 비율 데이터 반환
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    alld2010 = all2010['AIR_ON'].value_counts()
    labels = alld2010.index.tolist()
    values = alld2010.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)


@app.route('/api/pie-alldate-2020')
def alldate2020():
    """
    2020년대 전체(TV+OTT) 드라마 방영 시기별 비율 데이터 반환
    
    Returns:
        JSON: 방영 시기, 드라마 개수, 색상 정보
    """
    alld2020 = all2020['AIR_ON'].value_counts()
    labels = alld2020.index.tolist()
    values = alld2020.values.tolist()

    colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 0, 255, 0.7)',
        'rgba(0, 255, 255, 0.7)',
        'rgba(128, 128, 0, 0.7)'
    ]

    data = {
        'labels': labels,
        'values': values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

# ============================================
# API 엔드포인트 - TV 채널별 드라마 수
# ============================================

@app.route('/api/bargen-data-2010')
def dramagen2010():
    """
    2010년대 TV 장르 수 데이터 반환
    """
    
    
    # OG_NETWORK 컬럼의 값 개수 집계 (내림차순 정렬)
    dramage2010 = tv2010['MAIN_GENRE'].value_counts()
    
    # 인덱스(채널명)를 리스트로 변환
    labels = dramage2010.index.tolist()
    
    # 값(드라마 수)을 리스트로 변환
    values = dramage2010.values.tolist()

    # JSON 형식으로 반환할 딕셔너리 생성
    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


@app.route('/api/bargen-data-2020')
def dramagen2020():
    """
    2020년대 TV 장르 수 데이터 반환
    

    """
    dramage2020 = tv2020['MAIN_GENRE'].value_counts()
    labels = dramage2020.index.tolist()
    values = dramage2020.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


# ============================================
# API 엔드포인트 - OTT 플랫폼별 드라마 수
# ============================================

@app.route('/api/bargen-ott-2010')
def ottgen2010():
    """
    2010년대 OTT 장르 수 데이터 반환
    
    """
    ottge2010 = ott2010['MAIN_GENRE'].value_counts()
    labels = ottge2010.index.tolist()
    values = ottge2010.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


@app.route('/api/bargen-ott-2020')
def ottgen2020():
    """
    2020년대 OTT 장르 수 데이터 반환
    

    """
    ottge2020 = ott2020['MAIN_GENRE'].value_counts()
    labels = ottge2020.index.tolist()
    values = ottge2020.values.tolist()

    data = {
        'labels': labels,
        'values': values
    }
    return jsonify(data)


# ============================================
# 애플리케이션 실행
# ============================================

if __name__ == '__main__':
    # 디버그 모드로 Flask 서버 실행
    # debug=True: 코드 변경 시 자동 재시작, 에러 메시지 상세 표시
    app.run(
        host = '192.168.219.107',
        port = '5000',
        debug=True
        )