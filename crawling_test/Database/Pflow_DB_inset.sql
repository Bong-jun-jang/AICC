INSERT INTO `users` (`user_email`, `user_password`, `user_authority`) 
VALUES 
('user1@example.com', 'password123', TRUE),
('user2@example.com', 'password456', FALSE);

INSERT INTO `user_info` (`info_name`, `info_gender`, `info_birth`, `info_phone_number`, `info_address`, `info_detail`, `info_portfolio`, `user_id`) 
VALUES 
('홍길동', '남', '1990-01-01', '01012345678', '서울시 강남구', '101호', 'www.portfolio.com', 1),
('김영희', '여', '1992-03-05', '01098765432', '부산시 해운대구', '201호', 'www.portfolio2.com', 2);

INSERT INTO `category` (`category`) 
VALUES 
('면접후기'), 
('퇴사후기'), 
('일상'), 
('진로상담');

INSERT INTO `boards` (`board_title`, `board_content`, `board_date`, `board_view`, `user_id`, `category_id`) 
VALUES 
('첫 면접 후기', '첫 면접을 보고 왔습니다...', '2024-09-01', 10, 1, 1),
('퇴사 결심', '오랜 고민 끝에 퇴사를 결정했습니다.', '2024-08-15', 23, 2, 2);

INSERT INTO `graduation` (`graduation_category`) 
VALUES 
('졸업'), 
('재학'), 
('휴학'), 
('중퇴');

INSERT INTO `education` (`school_name`, `major`, `education_date`, `graduation_id`) 
VALUES 
('서울대학교', '컴퓨터공학', '2010-02-20', 1),
('부산대학교', '경영학', '2012-08-15', 1);

INSERT INTO `cover_letter` (`letter_title`, `letter_content`) 
VALUES 
('첫 자소서', '성실하게 임하겠습니다.'),
('경력직 자소서', '이전 회사에서의 경험을 살리겠습니다.');

INSERT INTO `resume` (`photo`, `resume_email`, `education_id`, `letter_id`, `user_id`) 
VALUES 
('photo1.jpg', 'resume1@example.com', 1, 1, 1),
('photo2.jpg', 'resume2@example.com', 2, 2, 2);

INSERT INTO `career` (`career_id`, `resume_id`, `career_name`, `career_start`, `career_end`, `career_work`, `career_position`) 
VALUES 
(1, 1, 'ABC Corp', '2015-03-01', '2020-02-28', '프로젝트 관리', '과장'),
(2, 2, 'XYZ Corp', '2016-05-01', '2021-04-30', '데이터 분석', '대리');

INSERT INTO `certification` (`certification_id`, `resume_id`, `certification_date`, `certification_name`, `certification_number`, `certification_center`) 
VALUES 
(1, 1, '2019-06-01', '정보처리기사', '12345', '한국산업인력공단'),
(2, 2, '2020-11-20', '빅데이터분석기사', '67890', '한국정보화진흥원');

INSERT INTO `training` (`training_id`, `resume_id`, `training_name`, `training_center`, `training_start`, `training_end`, `training_program`) 
VALUES 
(1, 1, '부트캠프', '코드랩 아카데미', '2021-01-15', '2021-06-15', 'K 인증 프로그램'),
(2, 2, '빅데이터 교육', '빅데이터 연구소', '2020-05-01', '2020-12-01', '빅데이터 전문가 과정');

INSERT INTO `skill` (`skill_id`, `resume_id`, `skill_name`) 
VALUES 
(1, 1, 'Python'),
(2, 2, 'JIRA');

INSERT INTO `comment` (`comment_content`, `comment_date`, `board_id`, `user_id`) 
VALUES 
('잘 봤습니다!', '2024-09-02', 1, 2),
('저도 비슷한 경험이 있어요.', '2024-09-03', 2, 1);