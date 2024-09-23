import pandas as pd
import requests
import time
import random
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

driver = webdriver.Chrome("")
url = "https://www.jobkorea.co.kr/recruit/joblist?menucode=duty"
# 직무별 채용 페이지 url 지정
driver.get(url)
# 잡코리아 홈페이지 접속
headers = {'User-Agent': 'Mozilla/5.0'}
res = requests.get(driver.current_url, headers = headers)
# 차단되었을때 우회하는 방법

driver.find_element(By.XPATH, value = '//*[@id="devSearchForm"]/div[2]/div/div[1]/dl[1]/dd[2]/div[2]/dl[1]/dd/div[1]/ul/li[6]').click()
# 개발,데이터 분야 클릭

# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[1]').click()
# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[2]').click()
# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[4]').click()
# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[5]').click()
# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[8]').click()
# driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[9]').click()
driver.find_element(By.XPATH, value = '//*[@id="duty_step2_10031_ly"]/li[14]/label/span/span').click()
# 원하는 직무 선택

driver.find_element(By.XPATH, value = '//*[@id="devSearchForm"]/div[2]/div/div[1]/dl[2]/dt').click()
driver.find_element(By.XPATH, value = '//*[@id="devSearchForm"]/div[2]/div/div[1]/dl[2]/dd[2]/div[2]/dl[1]/dd/div[1]/ul/li[1]').click()
# 근무지역 -> 서울
driver.find_element(By.XPATH, value = '//*[@id="local_step2_I000_ly"]/li[3]').click()
driver.find_element(By.XPATH, value = '//*[@id="local_step2_I000_ly"]/li[9]').click()
driver.find_element(By.XPATH, value = '//*[@id="local_step2_I000_ly"]/li[10]').click()
driver.find_element(By.XPATH, value = '//*[@id="local_step2_I000_ly"]/li[17]').click()
driver.find_element(By.XPATH, value = '//*[@id="local_step2_I000_ly"]/li[20]').click()
# 금천구 구로구 강남구 서초구 송파구

driver.find_element(By.ID, value = 'dev-btn-search').click()
# 선택된 데이터로 직업 검색 클릭
time.sleep(3)
# WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "bbArea")))

company_name_list = []
Career_list = []
Edu_list = []
Location_list = []
Type_list = []
Salary_list = []
Title_list = []
company_url_list = []
Title_url_list = []

Skill_list = []
Address = []
S_day_list = []
D_day_list = []


def list_select():
    body = driver.find_element(By.ID, value = "dev-gi-list")
## 원하는 body태그... 검색결과 전체
    tr = body.find_elements(By.CLASS_NAME, value = 'devloopArea')
## body안의 tr태그... 전체 중 한 줄(하나의 공고문)에 대한 태그
    for tr_ in tr:
        name = tr_.find_element(By.CSS_SELECTOR, value = 'a')
        company_name_list.append(name.text)
## 기업 이름 리스트 뽑기

        title = tr_.find_element(By.CSS_SELECTOR, value = 'strong')
        Title_list.append(title.text)
## 공고문 제목 리스트 뽑기
        
        c_herf = tr_.find_element(By.CLASS_NAME, value = 'tplCo')
        c_tag = c_herf.find_element(By.TAG_NAME,"a")
        c_link = c_tag.get_attribute('href')
        # 기업정보 링크 뽑기

        t_herf = tr_.find_element(By.CLASS_NAME, value = 'tplTit')
        t_tag = t_herf.find_element(By.TAG_NAME,"a")
        t_link = t_tag.get_attribute('href')
        # 공고문정보 링크 뽑기 
        
        company_url_list.append(c_link)
        # 해당 기업 링크
        Title_url_list.append(t_link)
        # 해당 공고문 링크

        page_in(t_link)
        # 해당 공고문에 들어가 상세목록 살펴보기 ...

# 첫번째 a태그 ... 기업 링크, 두번째 a태그 ... 공고문 링크
# # 해당 공고문에 대한 url 링크 리스트 뽑기

    # Wait = WebDriverWait(driver, 10).until(EC.presence_of_elements_located((By.CLASS_NAME,'cell')))
        # info = tr_.find_elements(By.CLASS_NAME, value = 'cell')
        # for i in range(len(info)):
        #     if i == 0:
        #         Career_list.append(info[i].text)
        #     elif i == 1:
        #         Edu_list.append(info[i].text)
        #     elif i == 2:
        #         Location_list.append(info[i].text)
        #     elif i == 3:
        #         Type_list.append(info[i].text)
        #     elif len(info) < 3:
        #         Type_list.append("")
            # elif i == 4:
            #     Salary_list.append(info[i].text)

            # elif len(info) != 5:
            #     Salary_list.append('')

            # Salary에 해당하는 data가 없는 부분이 있어 잠시 생략

# table에서 class가 cell에 해당하는 정보 뽑기
# 경력, 학력, 위치 등 정보 리스트 뽑기

def page_in(link):
    count = 0
    Tem = []
    date = []

    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(link,headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        # List = soup.find('dl',attrs={"class": "tbList"})
        div = soup.select(".tbCol")
        # 지원 자격 table 지정
        address = soup.find('strong',attrs={"class": "girIcn"})
        # 상세주소 태그 지정
        # days = soup.find_all('dd',attrs={"class": "date"})

        days = soup.select(".date > dd")

        for day in days:
            date.append(day.text)
        # 공고 시작일과 마감일 ...
        
        dd1 = div[0].find('dl',attrs={"class": "tbList"}).find_all('dd')

        # if len(dd1)<2:
        #     Skill_list.append('')

        for i in range(len(dd1)):
            if i == 0:
                Career_list.append(dd1[i].text.strip().replace(' ',''))
            # 경력
            elif i ==1:
                Edu_list.append(dd1[i].text.strip().replace(' ',''))
            # 학력
            elif i ==2 or len(dd1)<2:
                # skill = []
                # skill.append(dd1[i].text.strip().replace(' ',''))
                Skill_list.append(dd1[i].text.strip().replace(' ',''))
                # Skill_list.append(skill)
        # 기술, 역량 등 ....

        dd2 = div[1].find('dl',attrs={"class": "tbList"}).find_all('dd')

        add = dd2[2].text.strip()
        Location_list.append(add.split()[1])
        # "oo구" 위치 ...

        id = soup.select("#artKeywordSearch")

        # dd = List.find_all('dd')
        # for i in dd:
        #     if len(dd) < 3:
        #             Tem.append("")
        #             count += 1
        #     if count == 3:
        #         break 
        #     else:
        #         Tem.append(i.text.strip().replace("\n",""))
        #         count += 1
        # 지원자격 태그에서 작업 ...

    # Skill_list.append(Tem[2])
    # # 필요한 스킬 ...

    if address is None:
        Address.append("홈페이지 참고")
    else:
        Address.append(address.text)
    # 기업의 상세주소 ...

    if len(days) == 0:
        # S_day_list.append("상시채용")
        D_day_list.append("상시채용")
    else:
        # S_day_list.append(date[0])
        # 시작일 ...
        D_day_list.append(date[1])
        # 마감일 ...

    time.sleep(random.uniform(0,2))
    # 잡코리아 페이지에서 접속을 막는 현상 피하기 ...
    print(f"page_in함수 실행")
# 상세목록 살펴보는 함수 ...

def data_setup():
    data = {
        'Location' : Location_list,
        'Company' : company_name_list,
        'Title' : Title_list,
        'Career' : Career_list,
        'Edu' : Edu_list,
        'Skill' : Skill_list,
        'Address' : Address,
        'Title_link' : Title_url_list,
        'D_day' : D_day_list,
        'Type' : Type_list
        # 'Salary' : Salary_list,
        # 'Company_link' : company_url_list,
        # 'S_day' : S_day_list,
       }
    job_df = pd.DataFrame(data)
    return job_df

    #데이터프레임으로 만들기


def page_Move(page,count):
    page_div = driver.find_element(By.ID, value = "dvGIPaging")
    page_li = page_div.find_elements(By.TAG_NAME, value = "li")
    page_p = page_div.find_elements(By.TAG_NAME, value = "p")

    if page != 0 and ((count)%10) == 0:
        for p in page_p:
            a_tag = p.find_elements(By.TAG_NAME, value = "a")
            for a in a_tag:
                if "다음" in a.text:
                     a.click()
        page = 0
        # 마지막 page에서 "다음"을 눌러야 할때 ...
        # ex) 10page -> "다음" 클릭 ...

    elif page_li[page].text == str(count):
        if page+1 >= len(page_li):
            return None
        # 다음 페이지가 없을때 ... None값 리턴
        else:
            page_li[page+1].click()
            page += 1
            # 다음 페이지 클릭

        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "tbody")))
        # 새로운 페이지 클릭하고 새로운 요소가 생성될때까지 대기(최대 10초)
    
    return page

# 페이지 이동 함수

page = 0
count = 1
# 페이지 리스트 초기값
condition = True

while condition:
    list_select()
    new_page = page_Move(page,count)

    if new_page is None:
        condition = False
        # 다음 페이지가 None이면 while문 빠져나가기
    else:
        page = new_page
        count += 1
# 페이지 이동을 위해 while문 반복문 사용

driver.quit()

data_setup().to_csv('job_list.csv',index=False)
