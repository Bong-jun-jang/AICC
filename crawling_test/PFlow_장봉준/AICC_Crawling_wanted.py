import pandas as pd
import requests
import time
import random
from bs4 import BeautifulSoup
from urllib.parse import urljoin
# from mysql.connector import pooling
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
# Headless 모드 적용하기 위한 import
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--remote-debugging-port=9222")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36")
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# driver = webdriver.Chrome("")
url_base = 'https://www.wanted.co.kr'
url = "https://www.wanted.co.kr/wdlist?country=kr&job_sort=job.recommend_order&years=-1&locations=all"
# 직무별 채용 페이지 url 지정
driver.get(url)
# 원티드 홈페이지 접속
headers = {'User-Agent': 'Mozilla/5.0'}
res = requests.get(driver.current_url, headers = headers)
# 차단되었을때 우회하는 방법

# 시작시간 체크
start_time = time.time()

# 리스트 준비
title = [] # 공고문 제목
company = [] # 회사 이름
career = [] # 경력 사항
main_work = [] # 주요업무
qualification = [] # 자격요건
addition = [] # 우대사항
welfare = [] # 복지
skill = [] # 기술 태그
tag = [] # 태그
deadline = [] # 마감일
location = [] # 근무지역
duty = [] #직무
url_info = [] # 해당 공고문 url

# 돌아가며 직군 선택
def search_duty(i):
    try:
        driver.find_element(By.XPATH,'//*[@id="__next"]/div[3]/div[1]/section/div[1]/section/div/button/span/span').click()
        div = driver.find_element(By.CLASS_NAME,'Modal_Modal__root__body__o7bsn')
        duty = div.find_element(By.CSS_SELECTOR, value = 'ul')
        button = duty.find_elements(By.CSS_SELECTOR, value = 'button')
        duty_select = button[i].text
        button[i].click()
        div.find_element(By.XPATH,'//*[@id="__next"]/div[3]/div[1]/section/div[1]/section/div/div/div[2]/div[3]/button[2]').click()

        time.sleep(1)
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "Card_Card__WdaEk")))
        return duty_select
    except: 
        search_duty(i)
# 해당 직군에서 스크롤을 끝까지 내려 url 따기
def scrol_down():
    # 현재 페이지 전체 높이 구하기
    url_href = []
    page = driver.execute_script('return document.body.scrollHeight')

    while True:
    
    # 현재 페이지에서 스크롤 끝까지 내리기
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
        # 페이지가 로딩될때까지 기다림 JobList_JobList__Qj_5c
        time.sleep(2)
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "Card_Card__WdaEk")))

        # 더 이상 스크롤이 내려가지 않았다면 break
        try:
            # WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "Card_Card__WdaEk")))
            driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
            new_page = driver.execute_script('return document.body.scrollHeight')
            if new_page == page:
                break
            else: page = new_page
        except:
            driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
            continue

    # BeautifulSoup으로 파싱 후 공고문 url 담기
    req = driver.page_source
    soup = BeautifulSoup(req, 'html.parser')

    # 더 이상 스크롤이 안되면 해당 공고문 url 가져오기
    div = soup.find_all('li','Card_Card__WdaEk')
    for i in div:
        url_href.append(urljoin(url_base, i.find('a')['href']))
    return url_href

# 해당 공고문에 들어가서 정보 가져오기
def info(duty_select,url_href):
    check_count = 0

    chrome_options = Options()
    # headless 모드 옵션 적용
    chrome_options.add_argument("--headless")  # Headless 모드 사용
    chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (Windows에서 필요)
    chrome_options.add_argument("--disable-dev-shm-usage") # 메모리 문제 해결을 위한 옵션
    chrome_options.add_argument("--no-sandbox")
    # chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36")
    # chrome_options.add_argument("'User-Agent': 'Mozilla/5.0'")
    
    # ChromeDriverManager를 사용하여 적절한 드라이버를 설치한다.
    service = Service(ChromeDriverManager().install())
    # 드라이버와 옵션 적용
    driver_info = webdriver.Chrome(service=service, options=chrome_options)

    for url in url_href:

        # ChromeDriver 버전확인
        # driver_path = ChromeDriverManager().install()
        # print(f"Installed ChromeDriver at: {driver_path}")
        try:
            driver_info.get(url)
            # 원티드 홈페이지 접속
            # headers = {'User-Agent': 'Mozilla/5.0'}
            # res = requests.get(driver.current_url, headers = headers)
            # 차단되었을때 우회하는 방법
            try : 
                WebDriverWait(driver_info, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "JobDescription_JobDescription__paragraph__wrapper__G4CNd")))
            except : 
                driver_info.quit()
                try :
                    # service = Service(ChromeDriverManager().install())
                    # driver_info = webdriver.Chrome(service=service, options=chrome_options)
                    driver_info.get(url)
                    WebDriverWait(driver_info, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "JobDescription_JobDescription__paragraph__wrapper__G4CNd")))
                except : 
                    service = Service(ChromeDriverManager().install())
                    driver_info = webdriver.Chrome(service=service, options=chrome_options)
                    continue
            
            # 상세 정보 더 보기 클릭
            div = driver_info.find_element(By.CLASS_NAME,'JobDescription_JobDescription__paragraph__wrapper__G4CNd')
            try: driver_info.execute_script("arguments[0].click();", div.find_element(By.TAG_NAME,'button'))
            except: pass

            # BeautifulSoup으로 파싱
            req = driver_info.page_source
            soup = BeautifulSoup(req, 'html.parser')
            div = soup.find_all('div','JobDescription_JobDescription__paragraph__Lhegj')

            # 공고문 제목
            header = soup.find('header','JobHeader_JobHeader__InX6I')
            title.append( header.find('h1','Typography_Typography__root__RdAI1').text )

            # 요구 경력
            try: career.append( header.find_all('span','Typography_Typography__root__RdAI1')[-1].text)
            except : career.append("")

            # 기업 이름
            company.append(header.find('a','JobHeader_JobHeader__Tools__Company__Link__zAvYv').text)

            for i in range(4):
                if i == 0: # 주요업무
                    try: main_work.append(div[i].find('p').text)
                    except: main_work.append('')
                if i == 1: # 자격요건
                    try: qualification.append(div[i].find('p').text)
                    except: qualification.append('')
                if i == 2: # 우대사항
                    try: addition.append(div[i].find('p').text)
                    except: addition.append('')
                if i == 3: # 혜택 및 복지
                    try: welfare.append(div[i].find('p').text)
                    except: welfare.append('')
            
            # 기술스택
            # if(len(soup.find_all('li','SkillTagItem_SkillTagItem__K3B3t'))!=0):
            #     skill.append(soup.find_all('li','SkillTagItem_SkillTagItem__K3B3t').text)
            # else: skill.append('')

            try:
                li = soup.find_all('li','SkillTagItem_SkillTagItem__K3B3t')
                if(len(li)!=0):
                    skills = []
                    for i in li:
                        # print(i.text)
                        skills .append(('').join(i.text))
                        # print(f"skills = {skills}")
                    skill.append(skills)
                else: skill.append('')
            except: skill.append('')

            #태그 정보
            try: 
                ul = soup.find('ul','CompanyTags_CompanyTags__list__WjcTV')
                li = ul.find_all('li')
                if(len(li)!=0):
                    tags = []
                    for i in li:
                        # print(i.text)
                        tags .append(('').join(i.text))
                        # print(f"skills = {skills}")
                    tag.append(tags)
                else: tag.append('')
            except: tag.append('')

            # 근무지역
            try : location.append(soup.find('div','JobWorkPlace_JobWorkPlace__map__location____MvP').text)
            except : location.append(header.find_all('span','Typography_Typography__root__RdAI1')[1].text)

            # 마감일
            try:
                article = soup.find('article','JobDueTime_JobDueTime__3yzxa')
                deadline.append(article.find('span').text)
            except: deadline.append("상시채용")

            # 직군
            duty.append(duty_select)

            #상세 페이지 url
            try : url_info.append(url)
            except : 
                url_info.append(driver_info.current_url)
                continue

            print('scan succes')
        except: 
            driver_info.quit()

            service = Service(ChromeDriverManager().install())
            driver_info = webdriver.Chrome(service=service, options=chrome_options)

            check_count += 1
            print(f"해당 url 접속 에러 : {url}")

            continue
    driver_info.quit()
    print(f"넘어간 횟수 : {check_count}")

# df 만들기
def data_setup():
    data = {
        'Title' : title,
        'Company' : company,
        'Career' : career,
        'Work' : main_work,
        'Qualification' : qualification,
        'Addition' : addition,
        'Welfare' : welfare,
        'Skill' : skill,
        'Tag' : tag,
        'Deadline' : deadline,
        'Location' : location,
        'Duty' : duty,
        'URL' : url_info,
        
       }
    wanted_df = pd.DataFrame(data)
    return wanted_df

for i in range(1,20):
    duty_select = search_duty(i) # 직군 선택하기
    url_href = scrol_down() # 스크롤 끝까지 내리기
    info(duty_select,url_href) # 공고문 정보 가져오기

    data_setup().to_csv('wanted.csv', index=False, encoding="utf-8")

    elapsed_time = time.time() - start_time
    print(f"총 걸린시간 : {elapsed_time/60} 분")
driver.quit()
# df 저장
# data_setup().to_csv('wanted.csv', index=False, encoding="utf-8")
