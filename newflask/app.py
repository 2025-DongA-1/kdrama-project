from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# 데이터 불러오기 및 불필요 데이터 제거
data123 = pd.read_csv('./channelData.CSV')
data = data123.drop('DRAMA_PK', axis=1)

# 연도 구분
data2010 = data[data['AIR_YEAR']<2020]
data2020 = data[data['AIR_YEAR']>=2020]

# TV데이터
tv2020 = data2020[(data2020['OG_NETWORK'] == 'KBS2') | (data2020['OG_NETWORK'] == 'SBS') | (data2020['OG_NETWORK'] == 'MBC') | (data2020['OG_NETWORK'] == 'jTBC') | (data2020['OG_NETWORK'] == 'tvN') |  (data2020['OG_NETWORK'] == 'OCN')]
tv2010 = data2010[(data2010['OG_NETWORK'] == 'KBS2') | (data2010['OG_NETWORK'] == 'SBS') | (data2010['OG_NETWORK'] == 'MBC') | (data2010['OG_NETWORK'] == 'jTBC') | (data2010['OG_NETWORK'] == 'tvN') |  (data2010['OG_NETWORK'] == 'OCN')]

# ott 데이터
ott2010 = data2010[(data2010['OG_NETWORK'] == 'Netflix') | (data2010['OG_NETWORK'] == 'Naver TV Cast')]
ott2020 = data2020[(data2020['OG_NETWORK'] == 'Netflix') | (data2020['OG_NETWORK'] == 'Daum Kakao TV') | (data2020['OG_NETWORK'] == 'Wavve') | (data2020['OG_NETWORK'] == 'YouTube') | (data2020['OG_NETWORK'] == 'Olleh TV') | (data2020['OG_NETWORK'] == 'Apple TV+') | (data2020['OG_NETWORK'] == 'Disney+')]

# 전체 데이터
all2010 = data2010[(data2010['OG_NETWORK'] != 'Viki') & (data2010['OG_NETWORK'] != 'MBN') & (data2010['OG_NETWORK'] != 'TV Chosun') & (data2010['OG_NETWORK'] != 'vLive')]
all2020 = data2020[(data2020['OG_NETWORK'] != 'ViuTv') & (data2020['OG_NETWORK'] != 'Viki') & (data2020['OG_NETWORK'] != 'iQiyi') & (data2020['OG_NETWORK'] != 'ENA') & (data2020['OG_NETWORK'] != 'Hulu') &  (data2020['OG_NETWORK'] != 'Channel A')]

# 메인페이지 라우트
@app.route('/')
def index():
    return render_template('index.html')

# tv 연대별 분석
@app.route('/api/bar-data-2010')
def age2010():
    rs2010 = tv2010['OG_NETWORK'].value_counts()
    labels = rs2010.index.tolist()
    values = rs2010.values.tolist()

    data = {
        'labels' : labels,
        'values' : values
    }
    return jsonify(data)

@app.route('/api/bar-data-2020')
def age2020():
    rs2020 = tv2020['OG_NETWORK'].value_counts()
    labels = rs2020.index.tolist()
    values = rs2020.values.tolist()

    data = {
        'labels' : labels,
        'values' : values
    }
    return jsonify(data)

# ott 드라마 수

@app.route('/api/bar-ott-2010')
def ottd2010():
    rso2010 = ott2010['OG_NETWORK'].value_counts()
    labels = rso2010.index.tolist()
    values = rso2010.values.tolist()

    data = {
        'labels' : labels,
        'values' : values
    }
    return jsonify(data)

@app.route('/api/bar-ott-2020')
def ottd2020():
    rso2020 = ott2020['OG_NETWORK'].value_counts()
    labels = rso2020.index.tolist()
    values = rso2020.values.tolist()

    data = {
        'labels' : labels,
        'values' : values
    }
    return jsonify(data)

@app.route('/api/pie-data-2010')
def ageall2010():
    ageall2010 = all2010['OG_NETWORK'].value_counts()
    labels = ageall2010.index.tolist()
    values = ageall2010.values.tolist()

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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-data-2020')
def ageall2020():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-tv-2010')
def tvdate2010():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-tv-2020')
def tvdate2020():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-ott-2010')
def ottdate2010():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-ott-2020')
def ottdate2020():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-alldate-2010')
def alldate2010():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/api/pie-alldate-2020')
def alldate2020():
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
        'labels' : labels,
        'values' : values,
        'backgroundColor': colors[:len(labels)]
    }
    return jsonify(data)

@app.route('/drama')
def comparison():
    return render_template('drama.html')

@app.route('/ott')
def ottdrama():
    return render_template('ott.html')

@app.route('/all')
def alldrama():
    return render_template('all.html')

@app.route('/dramadate')
def dramadate():
    return render_template('dramadate.html')

@app.route('/ottdate')
def ottdate():
    return render_template('ottdate.html')

@app.route('/alldate')
def alldate():
    return render_template('alldate.html')

if __name__ == '__main__' :
    app.run(debug=True)