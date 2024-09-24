CREATE TABLE `users` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`user_email` varchar(20) NOT NULL unique,
	`user_password` varchar(20) NOT NULL,
    `user_authority` boolean NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE `category` (
	`category_id` int NOT NULL COMMENT '4개' AUTO_INCREMENT,
	`category` varchar(8) NOT NULL COMMENT '면접후기, 퇴사후기, 일상, 진로상담',
	PRIMARY KEY (category_id)
);

CREATE TABLE `boards` (
	`board_id` int NOT NULL COMMENT '게시글의 고유한 번호' AUTO_INCREMENT,
	`board_title` varchar(20) NOT NULL,
	`board_content` varchar(1000) NULL,
	`board_date` date NOT NULL,
	`board_view` int NOT NULL COMMENT '방문한 숫자(0부터 시작)',
	`user_id` int NOT NULL,
    `category_id` int NOT NULL,
	PRIMARY KEY (board_id ),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE

);

CREATE TABLE `graduation` (
	`graduation_id` int NOT NULL COMMENT '4개' AUTO_INCREMENT,
	`graduation_category` varchar(4) NOT NULL COMMENT 'ex) 졸업, 재학, 휴학, 중퇴',
	PRIMARY KEY (graduation_id)
);

CREATE TABLE `education` (
	`education_id` int NOT NULL COMMENT '작성한 학력의 고유 번호' AUTO_INCREMENT,
	`school_name` varchar(10) NOT NULL,
	`major` varchar(20) NULL COMMENT '대학교라면 전공, 고졸이면 null가능',
	`education_date` date NOT NULL,
	`graduation_id` int NOT NULL COMMENT '4개',
    PRIMARY KEY (education_id),
    FOREIGN KEY (graduation_id) REFERENCES graduation(graduation_id) ON DELETE CASCADE

);

CREATE TABLE `cover_letter` (
	`letter_id` int NOT NULL COMMENT '작성한 자소서 고유 번호' AUTO_INCREMENT,
	`letter_title` varchar(20) NOT NULL COMMENT '자소서 제목',
	`letter_content` varchar(500) NOT NULL COMMENT '작성한 자소서 내용',
    PRIMARY KEY (letter_id)
);

CREATE TABLE `resume` (
	`resume_id` int NOT NULL COMMENT '작성한 이력서' AUTO_INCREMENT,
	`photo` varchar(255) NULL COMMENT '이력서에 올릴 사진',
	`education_id` int NOT NULL COMMENT '작성한 학력의 고유 번호',
	`letter_id`  int NOT NULL COMMENT '작성한 자소서 고유 번호',
	`user_id` int NOT NULL,
	PRIMARY KEY (resume_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE CASCADE,
	FOREIGN KEY (letter_id) REFERENCES cover_letter(letter_id) ON DELETE CASCADE
);

CREATE TABLE `comment` (
	`comment_id` int NOT NULL COMMENT '댓글의 고유한 번호' AUTO_INCREMENT,
	`comment_content` varchar(100) NOT NULL,
	`comment_date` date NOT NULL,
	`board_id` int NOT NULL COMMENT '게시글의 고유한 번호',
	`user_id` int NOT NULL,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (board_id) REFERENCES boards(board_id) ON DELETE CASCADE
);

CREATE TABLE `career` (
	`career_id` int NOT NULL COMMENT '작성한 경력의 고유 번호',
    `resume_id` int NOT NULL,
	`career_name` varchar(20) NOT NULL COMMENT '경력이 있는 사람만 테이블 생성',
	`career_start` date NOT NULL,
	`career_end` date NOT NULL,
	`career_work` varchar(20) NOT NULL COMMENT '다니던 회사에서의 담당 업무',
	`career_position` varchar(10) NOT NULL COMMENT 'ex) 사원, 대리, 과장, 부장, 연구원 등 ...',
	PRIMARY KEY (career_id, resume_id),
    FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
);

CREATE TABLE `training` (
	`training_id` int NOT NULL COMMENT '작성한 교육이수의 고유 번호' AUTO_INCREMENT,
    `resume_id` int NOT NULL,
    `training_name` varchar(20) NOT NULL,
	`training_center` varchar(10) NOT NULL COMMENT '교육을 들었던 기관 .... ex) 코드랩 아카데미',
	`training_start` date NOT NULL COMMENT '개강 날짜',
	`training_end` date NOT NULL COMMENT '종강 날짜',
	`training_program` varchar(20) NOT NULL COMMENT 'ex) 부트캠프, K 인증 프로그램 등..',
	PRIMARY KEY (training_id, resume_id),
    FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
);

CREATE TABLE `skill` (
	`skill_id` int NOT NULL,
    `resume_id` int NOT NULL,
	`skill_name` varchar(10) NOT NULL COMMENT 'ex) python, JIRA 등등 ..',
	PRIMARY KEY (skill_id, resume_id),
    FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
);

CREATE TABLE `user_info` (
	`info_id` int NOT NULL AUTO_INCREMENT,
	`info_name` varchar(5) NOT NULL,
	`info_gender` enum('남' , '여') NOT NULL,
	`info_birth` date NOT NULL,
	`info_phone_number` varchar(12) NOT NULL,
	`info_address` varchar(20) NOT NULL,
    `info_detail` varchar(20) NOT NULL,
    `info_portfolio` varchar(30) NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (info_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- CREATE TABLE `certification` (
-- 	`certification_id` int NOT NULL COMMENT '작성한 자격증의 고유 번호',
--     `resume_id` int NOT NULL,
-- 	`certification_date` date NOT NULL,
-- 	`certification_name` varchar(20) NOT NULL COMMENT 'ex) 정보처리기사, 빅데이터분석기사',
-- 	`certification_number` varchar(20) NULL COMMENT '자격증 번호',
-- 	`certification_center` varchar(15) NOT NULL COMMENT 'ex) 한국산업인력공단, 한국전력공사, 한국정보화진흥원',
-- 	PRIMARY KEY (certification_id, resume_id),
--     FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
-- );


-- 회사 추천 DB 설계는 나중에 생각
-- CREATE TABLE `company` (
-- 	`company_id` int NOT NULL AUTO_INCREMENT,
-- 	`company_name` varchar(20) NOT NULL,
-- 	`company_location` varchar(40) NOT NULL
-- );

-- CREATE TABLE `posting` (
-- 	`posting_id` int NOT NULL AUTO_INCREMENT,
-- 	`posting_title` varchar(20) NOT NULL,
-- 	`posting_deadline` varchar(20) NOT NULL,
-- 	`posting_career` varchar(20) NOT NULL,
-- 	`posting_work` varchar(200) NULL,
-- 	`posting_prefer` varchar(200) NULL,
-- 	`posting_welfare` varchar(200) NULL,
-- 	`posting_url` varchar(100) NOT NULL,
-- 	`posting_skill` varchar(40) NULL COMMENT 'ex) python, java, C#, 워드, JIRA, 컨설팅 등등 ...'
-- );

-- CREATE TABLE `company_posting` (
-- 	`company_id` int NOT NULL,
-- 	`posting_id` int NOT NULL
-- );

-- CREATE TABLE `certification_resume` (
-- 	`certification_id` int NOT NULL COMMENT '작성한 자격증의 고유 번호',
-- 	`resume_id` int NOT NULL COMMENT '작성한 이력서',
-- 	FOREIGN KEY (certification_id) REFERENCES certification(certification_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
-- );

-- CREATE TABLE `career_resume` (
-- 	`career_id` int NOT NULL COMMENT '작성한 경력의 고유 번호',
-- 	`resume_id` int NOT NULL COMMENT '작성한 이력서',
-- 	FOREIGN KEY (career_id) REFERENCES career(career_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
-- );

-- CREATE TABLE `training_resume` (
-- 	`training_id` int NOT NULL COMMENT '작성한 교육이수의 고유 번호',
-- 	`resume_id` int NOT NULL COMMENT '작성한 이력서',
-- 	FOREIGN KEY (training_id) REFERENCES training(training_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE
-- );

-- CREATE TABLE `board_category` (
-- 	`board_id` int NOT NULL COMMENT '게시글의 고유한 번호' AUTO_INCREMENT,
-- 	`category_id` int NOT NULL COMMENT '4개',
-- 	FOREIGN KEY (board_id) REFERENCES board(board_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
-- );

-- CREATE TABLE `skill_resume` (
-- 	`resume_id` int NOT NULL COMMENT '작성한 이력서',
-- 	`skill_id` int NOT NULL,
-- 	FOREIGN KEY (resume_id) REFERENCES resume(resume_id) ON DELETE CASCADE,
-- 	FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE
-- );