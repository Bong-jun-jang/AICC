// const express = require('express');
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');  
// const cookieParser = require('cookie-parser');
// const json = require('body-parser/lib/types/json');


// // const promisePool = require('./promisePool');

// dotenv.config();

// const app = express();
// app.use(cookieParser());
// app.use(bodyParser.json());
// // app.use(cors());


// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


// dotenv.config(); // 토큰의 secret key를 .env 파일에 환경 변수로 저장하기 위해서 사용
// // 보안적인 이유로 코드에 직접 secret key를 하드코딩하지 않고, 환경 변수로 관리하기 위함
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// const corsOptions = {
//     origin: 'http://localhost:3000', // 클라이언트의 도메인
//     credentials: true, // 쿠키와 같은 자격 증명을 허용
// };

// app.use(cors(corsOptions));
// // 같은 컴퓨터에서 작업 할지라도 port가 다르면 Origin이 다르다.
// // Origin이 다른 접근은 무조건 막기 때문에 허용하는 작업이 필요하다.






// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // 로그인 요청 받음
// app.post('/api/auth/sign-in',async (req,res)=>{
//     // console.log(req.body);
//     console.log(JSON.stringify(req.body, null, 2));

//     const {ID, PW} = req.body;
//     console.log(ID,PW);

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         console.log('DB 연결 성공');
//         const [result] = await connection.query(`select * from users where user_email= ? and user_password= ? and user_email_verified = 1`,
//             [`${ID}`,`${PW}`]
//         )
//         console.log(result[0]);

//         if (!result[0]) res.json(result)
//             else{
//                 // 유저 정보가 있는경우 진행 ...
//                 console.log(`유저 정보 담겨있음 : ${result[0].user_id}, ${result[0].user_email}`)
//                 try{
//                     console.log('토큰 만들기 시작')
//                 // access Token 발급
//                 // DB에 들어있는 사용자 정보에 접근하기 위한 토큰
//                     const accessToken = jwt.sign({
//                     // 3가지 인수를 받는다.
//                     // 1. 어떤 유저정보를 담을지
//                         id : result[0].user_id,
//                         user : result[0].user_email
//                     }, process.env.ACCESS_SECRET, // 2. 토큰을 생성할 때 만들어지는 비밀키를 담을 환경변수
//                     {
//                     // 3. 토큰의 유효기간 설정
//                         expiresIn: '10m',
//                         issuer : 'About Tech',
//                     })
//                     console.log('토큰 만들기 access')

//                 // refresh Token 발급
//                 // Access Token을 갱신하는 용도의 토큰

//                 const refreshToken = jwt.sign({
                    
//                     // access토큰과 똑같이 3가지 인수를 받는다.
//                     // 1. 어떤 유저정보를 담을지
//                     id : result[0].user_id,
//                     user : result[0].user_email
//                 }, process.env.REFRESH_SECRET, // 2. access와 refresh 선택
//                 // secret key를 .env 파일에 환경 변수로 안전하게 저장
//                 {
//                     // 3. 토큰의 유효기간 설정 (access토큰을 갱신하기 때문에 기간을 길게 설정)
//                     expiresIn: '24h',
//                     issuer : 'About Tech',
//                 })
//                 console.log('토큰 만들기 refresh')

//                 // token들을 cookie에 담아서 전송
//                 res.cookie('accessToken',accessToken,{
//                     // 쿠키 속성값
//                     secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
//                     httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
//                     sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
//                 })
//                 console.log('accessToken 쿠키 생성')

//                 res.cookie('refreshToken',refreshToken,{
//                     // 쿠키 속성값
//                     secure: false,
//                     httpOnly: true,
//                     sameSite: 'Lax',
//                 })
//                 console.log('refreshToken 쿠키 생성')
//                 res.json(result); // data 전송

//                 } catch(error){
//                     console.error('토큰 생성 중 오류 발생:', error.message);
//                     res.json(error); // 에러 반환
//                 }
//             }
//             connection.release(); // 커넥션 풀 반환
        

//     } catch(err){
//         console.error("DB 쿼리 에러 : ",err);
//         res.status(500).send('서버에러');
//     }


// })

// // ID 중복 확인 
// app.post('/api/id_check', async (req,res)=>{
//     console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
//     const {ID} = req.body;

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         console.log('DB 연결 성공');
//         const [result] = await connection.query(`select * from users where user_email= ? and user_email_verified = 1`,
//             [`${ID}`]
//         )
//         console.log(result[0]);
//         res.json(result);

//         connection.release(); // 커넥션 풀 반환
        
//     } catch(error){
//         console.error("DB 쿼리 에러 : ",error);
//         res.status(500).send('서버에러');
//     }
// })

// // 회원 탈퇴 요청
// app.post('/api/delete', async (req,res)=>{
//     console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
//     const {ID} = req.body;

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         await connection.query(`delete from users where user_email=?`,
//             [`${ID}`]
//         )
//         console.log("회원 탈퇴 진행");

//         const [result] = await connection.query(`select * from users where user_email= ?`,
//             [`${ID}`]
//         )
//         console.log(result[0]);
//         res.json(result);

//         connection.release(); // 커넥션 풀 반환

//     } catch(error){
//         console.error("DB 쿼리 에러 : ",error);
//         res.status(500).send('서버에러');
//     }
// })


// // access Token 사용
// app.get('/api/accesstoken', (req,res)=>{
//     // 사용자마다 다른 서비스 제공
//     try{
//         // 요청받을 때 담겨있는 쿠키의 accessToken에 할당 된 값을 가져온다.
//         console.log('get 접속')
//         const token = req.cookies.accessToken;

//         // 유저 정보를 특정하기 위한 변수
//         // 인자로는 (쿠키에 저장된 토큰값 , 토큰을 생성할 때 만들어진 비밀 키값)
//         const data = jwt.verify(token, process.env.ACCESS_SECRET);
//         // const connection = await pool.getConnection();        
//         console.log(data)
//         res.json(data);

//         // 쿠키에 담겨있는 accessToken의 정보가 DB에 담겨있는 정보와 같은지 비교


//     } catch(error){
//         console.log("안녕하세요",error.message)
//         // res.json(error);
//     }
// })

// // refresh Token 사용
// app.get('/api/refreshtoken', (req,res)=>{
//     // accessToken을 갱신하는 목적
//     try{
//         const token = req.cookies.refreshToken;
//         const data = jwt.verify(token, process.env.REFRESH_SECRET);

//         // accessToken 새로 발급
//         const accessToken = jwt.sign({
//                 id : data.user_id,
//                 // user : data.ID
//                 user : data.user_email
//             }, process.env.ACCESS_SECRET,
//             {
//                 expiresIn: '10m',
//                 issuer : 'About Tech',
//             });

//             res.cookie('accessToken',accessToken,{
//                 // 쿠키 속성값
//                 secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
//                 httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
//                 sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
//             });

//     }catch{

//     }

// })


// // 로그아웃 할 때
// app.post('/api/auth/sign-out', (req,res)=>{
//     // 쿠키에 저장되어있는 토큰을 삭제, 초기화 작업
//     try{
//         res.cookie('accessToken',"");
//         res.cookie('refreshToken',"");
//         res.json('logout !!');
//     }catch(error){
//         res.json(error);
//     }
// })

// // 회원가입
// app.post('/api/auth/sign-up', async (req, res) => {
//     const { email, password } = req.body;

//     try {
     
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         // const hashedPassword = password;

//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 코드
//         const codeCreatedAt = new Date;
//         const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); // 10분 후

//         // await pool.query(
//         //     'DELETE FROM users WHERE email_verified=0;'
//         // );

//         await pool.query(
//             `INSERT INTO users (user_email, user_password, user_email_verified, user_verification_code, code_expires_at) VALUES (?, ?, FALSE, ?, ?)`,
//             [email, password, verificationCode, codeExpiresAt]
//         );

//         // 인증 보내는 email 주소 설정
//         let transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Email Verification',
//             text: `인증코드: ${verificationCode}. 인증을 진행해주세요.`
//         };

        
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Failed to send email:', error);
//                 return res.status(500).json({ success: false, error: '이메일 전송 실패' });
//             }
//             res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
//         });
//     } catch (error) {
//         console.error('Database error:', error);
//         console.error('Database error:', error.sql);
//         res.status(500).json({ success: false, error: '인증메일을 확인해주세요' });
//     }
// });

// // 인증코드 새로 받기 (시간초과로 인한 ...)
// app.post('/api/recode', async (req, res) => {
//     const { email, password } = req.body;
//     await pool.query(
//         `delete from users where user_email= ? and user_email_verified = 0`,
//         [email]
//     );

//     try {
     
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         // const hashedPassword = password;
   
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 코드
//         const codeCreatedAt = new Date;
//         const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); // 10분 후

//         // await pool.query(
//         //     'DELETE FROM users WHERE email_verified=0;'
//         // );

//         await pool.query(
//             `INSERT INTO users (user_email, user_password, user_email_verified, user_verification_code, code_created_at, code_expires_at) VALUES (?, ?, FALSE, ?, ?)`,
//             [email, password, verificationCode, codeExpiresAt]
//         );

  
//         let transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Email Verification',
//             text: `인증코드: ${verificationCode}. 인증을 진행해주세요.`
//         };

        
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Failed to send email:', error);
//                 return res.status(500).json({ success: false, error: '이메일 전송 실패' });
//             }
//             res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
//         });
//     } catch (error) {
//         console.error('Database error:', error);
//         console.error('Database error:', error.sql);
//         res.status(500).json({ success: false, error: '인증메일을 확인해주세요' });
//     }
// });

// // 이메일 인증
// app.post('/api/verify', async (req, res) => {
//     const { email, verificationCode } = req.body;

//     try {
       
//         const [results] = await pool.query(
//             `SELECT * FROM users WHERE user_email = ? AND user_verification_code = ? AND code_expires_at > NOW()`,
//             [email, verificationCode]
//         );

//         if (results.length === 0) {
//             return res.status(400).json({ success: false, message: '유효하지 않거나 만료된 코드입니다.' });
//         }


//         const user = results[0];
//         await pool.query(
//             `UPDATE users SET user_email_verified = TRUE, user_verification_code = NULL, code_created_at = NULL, code_expires_at = NULL WHERE user_id = ?`,
//             [user.id]
//         );

//         res.json({ success: true, message: '이메일 인증 성공!' });
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ success: false, error: '데이터베이스 오류' });
//     }
// });









// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// // 게시판 조회
// app.get('/api/boards', async (req, res) => {
//     const connection = await pool.getConnection(); 
//     try {
//         const [result] = await connection.query(`
//             SELECT 
//                 b.board_id,
//                 b.board_title,
//                 b.board_date,
//                 b.board_view,
//                 u.user_email, 
//                 c.category
//             FROM 
//                 boards b
//             JOIN 
//                 board_category bc ON b.board_id = bc.board_id
//             JOIN 
//                 category c ON bc.category_id = c.category_id
//             JOIN 
//                 users u ON b.user_id = u.user_id;  
            
//         `); 
//         console.log(result);
//         res.json(result); 
//     } catch (err) {
//         console.error('DB 조회 중 오류 발생:', err);
//         res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//     } finally {
//         connection.release(); 
//     }
// });




// //조회수 추가 업데이트 해야함
// app.get('/api/boards/:board_id', async (req, res) => {
//     const connection = await pool.getConnection();
    
//     try {
//         const board_Id = req.params.board_id;
//         const [result] = await connection.query(`
//             SELECT 
//                 b.board_id,
//                 b.board_title,
//                 b.board_date,
//                 b.board_view,
//                 b.board_content,
//                 u.user_email, 
//                 c.category,
//                 co.comment_id,
//                 co.user_id,
//                 co.comment_content,
//                 co.comment_date
//             FROM 
//                 boards b
//             JOIN 
//                 board_category bc ON b.board_id = bc.board_id
//             JOIN 
//                 category c ON bc.category_id = c.category_id
//             JOIN 
//                 users u ON b.user_id = u.user_id 
//             LEFT JOIN
//                 comment co ON b.board_id = co.board_id
//             WHERE b.board_id = ?;
//         `, [board_Id]);

//         await connection.query(`
//             UPDATE borads 
//             SET view = view +1 
//             WHERE board_id = ?;
//         `, [board_Id]);


//         if (result.length === 0) {
//             return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
//         }

//         res.json(result); 
//     } catch (err) {
//         console.error('DB 조회 중 오류 발생:', err);
//         res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//     } finally {
//         connection.release();
//     }
// });

// // 게시글 작성
// app.post('/api/boards', (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         const USER_ID = decoded.id;
//         const connection = await pool.getConnection();
//         const { TITLE, CONTENTS, CATEGORY } = req.body;

//         try {
//             const [result] = await connection.query(`
//                 INSERT INTO boards 
//                 (board_title, board_content, board_date, user_id) 
//                 VALUES (?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'), ?);
//             `, [TITLE, CONTENTS, USER_ID]);

//             const boardId = result.insertId;

//             await connection.query(`
//                 INSERT INTO board_category (board_id, category_id) 
//                 VALUES (?, ?);
//             `, [boardId, CATEGORY]);

//             res.status(201).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 생성되었습니다.' 
//             }); 
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     });
// });

// // 게시글 수정
// app.put('/api/boards/:board_id', (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;
//     const board_Id = req.params.board_id;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         const USER_ID = decoded.id;
//         const connection = await pool.getConnection();
//         const { TITLE, CONTENTS, CATEGORY } = req.body;

//         try {
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM boards 
//                 WHERE board_id = ?;
//             `, [board_Id]);

//             if (rows.length === 0) {
//                 return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
//             }

//             const boardUser_id = rows[0].user_id;

//             if (boardUser_id !== USER_ID) {
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             await connection.query(`
//                 UPDATE boards 
//                 SET 
//                     board_title = ?, 
//                     board_content = ?, 
//                     board_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')
//                 WHERE board_id = ?;
//             `, [TITLE, CONTENTS, board_Id]);

//             await connection.query(`
//                 UPDATE board_category 
//                 SET category_id = ?
//                 WHERE board_id = ?;
//             `, [CATEGORY, board_Id]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 업데이트되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     });
// });

// // 삭제
// app.delete('/api/boards/:board_id', (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;
//     const board_Id = req.params.board_id;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         const USER_ID = decoded.id;
//         const connection = await pool.getConnection();

//         try {
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM boards 
//                 WHERE board_id = ?;
//             `, [board_Id]);

//             if (rows.length === 0) {
//                 return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
//             }

//             const boardUser_id = rows[0].user_id;

//             if (boardUser_id !== USER_ID) {
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             await connection.query(`
//                 DELETE FROM boards
//                 WHERE board_id = ?;
//             `, [board_Id]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 제거되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     });
// });




























// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // 댓글 생성!
// app.post('/api/boards/:board_id/comments', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;
//     const board_Id = req.params.board_id;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     try {
//         // 현재 로그인 되어있는 유저의 user_id
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();
//         const { CONTENTS } = req.body;

//         try {
//             const [result] = await connection.query(`
//                 INSERT INTO comment 
//                 (
//                 board_id,
//                 comment_content, 
//                 comment_date,
//                 user_id
//                 )
//                 VALUES 
//                 (?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'), ?);
//             `, [board_Id, CONTENTS, USER_ID]);

//             res.status(201).json({ 
//                 code: "SU",
//                 message: '댓글이 성공적으로 생성되었습니다.' 
//             }); 
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     } catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }
// });


// //댓글수정!
// app.put('/api/boards/:board_id/comments/:comment_id', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;
//     const comment_Id = req.params.comment_id;
//     const board_Id = req.params.board_id;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();
//         const { CONTENTS } = req.body;

//         try {
//             // 댓글 작성자 ID 조회
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM comment 
//                 WHERE comment_id = ? and board_id = ?;
//             `, [comment_Id, board_Id]);

//             if (rows.length === 0) {
//                 return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
//             }

//             const commentUser_id = rows[0].user_id;

//             if (commentUser_id !== USER_ID) {
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             // 댓글 업데이트
//             await connection.query(`
//                 UPDATE comment 
//                 SET 
//                     comment_content = ?,
//                     comment_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')
//                 WHERE comment_id = ?;
//             `, [CONTENTS, comment_Id]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '댓글이 성공적으로 업데이트되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     } catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }
// });




// //댓글 삭제!
// app.delete('/api/boards/:board_id/comments/:comment_id', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;
//     const comment_Id = req.params.comment_id;
//     const board_Id = req.params.board_id;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();

//         try {
//             // 댓글 작성자 ID 조회
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM comment 
//                 WHERE comment_id = ? and board_id = ?;
//             `, [comment_Id, board_Id]);

//             if (rows.length === 0) {
//                 return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
//             }

//             const commentUser_id = rows[0].user_id;

//             if (commentUser_id !== USER_ID) {
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             // 댓글 삭제
//             await connection.query(`
//                 DELETE FROM comment
//                 WHERE comment_id = ?;
//             `, [comment_Id]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '댓글이 성공적으로 삭제되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     } catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }
// });







// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// //작성 된 이력서 상세 불러오기
// app.get('/api/resumes/:resume_id', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;

//     const resumeId = req.params.resume_id
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);
//         // USER_ID = 1;

//         const connection = await pool.getConnection();

//         try {
//             // 작성된 이력서를 불러올 때 보여 줄 부분을 정해야 함
//             const [resume] = await connection.query(`
//                 SELECT 
//                    ui.info_name, ui.info_gender, ui.info_birth, ui.info_phone_number, ui.info_address,info_detail, info_portfolio,
//                    re.photo,re.resume_email,
//                    e.school_name, e.major, e.education_date, 
//                    g.graduation_category,
//                    co.letter_title, co.letter_content
//                    from users u
//                    join user_info ui on u.user_id = ui.user_id
//                    join resume re on re.user_id = u.user_id
//                    join cover_letter co on co.letter_id = re.letter_id
//                    join education e on e.education_id = re.education_id
//                    join graduation g on g.graduation_id = e.graduation_id
//                    where u.user_id = ? and re.resume_id = ?;
//             `,[USER_ID,resumeId]);

//             const [career] = await connection.query(`
//                 select 
//                     car.career_name, car.career_work, car.career_position, car.career_start, car.career_end
//                     from career car
//                     where car.resume_id = ?;
//             `,[resumeId]);

//             const [certification] = await connection.query(`
//                 select 
//                     c.certification_name, c.certification_number, c.certification_center, c.certification_date
//                     from certification c
//                     where c.resume_id = ?;
//             `,[resumeId]);

//             const [training] = await connection.query(`
//                 select 
//                     t.training_program, t.training_name, t.training_center, t.training_start, t.training_end
//                     from training t
//                     where t.resume_id = ?;
//             `,[resumeId]);

//             const [skill] = await connection.query(`
//                 select 
//                     sk.skill_name
//                     from skill sk
//                     where sk.resume_id = ?;
//             `,[resumeId]);
            
//             res.json({resume,career,certification,training,skill});

//         } catch (err) {
//             console.error('DB 조회 중 오류 발생:', err);
//             res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//         } finally {
//             connection.release(); 
//         }

//     }
//     catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }
// });

// // 이력서 쓰기 
// // 외래 키로 연결된 테이블에 순차적으로 데이터를 삽입 해야한다.

// // 1. users 테이블 -> 2. 인증 테이블, 유저 정보 테이블
// // 3. (졸업 테이블 -> 학력 테이블), 자소서 테이블 -> 4. 이력서 테이블
// // 4. 이력서 테이블 -> 5. 경력 테이블, 자격증 테이블, 교육 이수 테이블, 기술 테이블
// // 3. 보드 테이블 -> 4. 카테고리 테이블, 댓글 테이블
// app.post('/api/resumes', async (req, res) => {
//     // const SECRET_KEY = process.env.ACCESS_SECRET;
//     // const token = req.cookies.accessToken;

//     console.log(JSON.stringify(req.body, null, 2));// 받아온 json형식 파일 확인

//     // 이력서 작성 후 받은 데이터
//     const {school_name,major,education_date,graduation_id,
//         letter_title,letter_content,
//         photo,resume_email,
//         career_name, career_start ,career_end ,career_work ,career_position,
//         certification_date ,certification_name ,certification_number ,certification_center,
//         training_center, training_start, training_end, training_program,
//         skill_name
//     } = req.body;
//     // graduation_id, 학력 입력사항, 사진, 자소서 입력사항, 기술 입력사항, 경력 입력사항, 자격증 입력사항, 교육이수 입력사항

//     // if (!token) {
//     //     return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     // }
//     try{
//         // 유저 식별
//         // const decoded = jwt.verify(token, SECRET_KEY);
//         // const USER_ID = decoded.id;
//         // console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();

//         try{
//             // 순서대로 insert 하기
//             // 학력 데이터 삽입 , 필수 입력
//             const [education] = await connection.query(`
//                 insert into education(
//                 school_name, major, education_date, graduation_id)
//                 values(
//                 ?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?)
//             `,[school_name, major, education_date, graduation_id,]); 
//             const educationId = education.insertId; // INSERT 문이 실행된 후에 AUTO_INCREMENT로 생성된 값을 반환
//             console.log("학력 데이터 삽입")

//             //자소서 데이터 삽입, 필수 입력
//             const [letter] = await connection.query(`
//                 insert into cover_letter(
//                 letter_title, letter_content)
//                 values(
//                 ?, ?)`
//             ,[ letter_title,letter_content])
//             const letterId = letter.insertId; // letter_id 값 가져오기
//             console.log("자소서 데이터 삽입")

//             // 이력서 데이터 삽입, 필수 입력
//             const [resume] = await connection.query(`
//                 insert into resume(
//                 photo, resume_email, education_id, letter_id, user_id)
//                 values(
//                 ?, ?, ?, ?, ?)`
//             ,[ photo, resume_email,educationId, letterId, USER_ID]);
//             const resumeId = resume.insertId; // resume_id 값 가져오기
//             console.log("이력서 데이터 삽입")

//             // 경력 데이터 삽입, 선택
//             const career = [] // 임시 변수, req.body에서 가져와야 함

//             if(!career.length===0){ // 경력 데이터 작성한 경우만 삽입
//                 for(let i=0;i<career.length;i++){ // 경력을 여러개 작성 한 경우
//                     await connection.query(`
//                         insert into career(
//                         career_id, resume_id, career_name, career_start, career_end, career_work, career_position)
//                         values(?, ?, ?, ?, ?, ?, ?)`
//                     ,[i+1, resumeId, career_name[i], career_start[i], career_end[i], career_work[i], career_position[i]]);
//                 }
//             }

//             // 자격증 데이터 삽입, 선택
//             const certification = [] // 임시 변수, req.body에서 가져와야 함
            
//             if(!certification.length===0){ // 경력 데이터 작성한 경우만 삽입
//                 for(let i=0;i<certification.length;i++){ // 경력을 여러개 작성 한 경우
//                     await connection.query(`
//                         insert into certification(
//                         certification_id, 
//                         resume_id, 
//                         certification_date, 
//                         certification_name, 
//                         certification_number, 
//                         certification_center)
//                         values(?, ?, ?, ?, ?, ?)`
//                     ,[i+1, resumeId, certification_date[i], certification_name[i], certification_number[i], certification_center[i]]);
//                 }
//             }

//             // 교육이수 데이터 삽입, 선택
//             const training = [] // 임시 변수, req.body에서 가져와야 함
            
//             if(!training.length===0){ // 이수 데이터 작성한 경우만 삽입
//                 for(let i=0;i<training.length;i++){ // 경력을 여러개 작성 한 경우
//                     await connection.query(`
//                         insert into training(
//                         training_id, resume_id, training_center, training_start, training_end, training_program)
//                         values(?, ?, ?, ?, ?, ?)`
//                     ,[i+1, resumeId, training_center[i], training_start[i], training_end[i], training_program[i]]);
//                 }
//             }

//             // 기술 데이터 삽입, 선택
//             const skill = [] // 임시 변수, req.body에서 가져와야 함
            
//             if(!skill.length===0){ // 기술 데이터 작성한 경우만 삽입
//                 for(let i=0;i<skill.length;i++){ // 경력을 여러개 작성 한 경우
//                     await connection.query(`
//                         insert into skill(
//                         skill_id, resume_id, skill_name)
//                         values(?, ?, ?)`
//                     ,[i+1, resumeId, skill_name[i]]);
//                 }
//             } 
//         res.status(200).json({ message: '이력서 작성 완료' });

//         } catch (err){
//             console.error('DB 조회 중 오류 발생:', err);
//             res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//         } finally {
//             connection.release();
//         }
//     } catch(err){
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }

// });


// //이력서 수정 U
// app.put('/api/resumes/:resume_id', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;

//     const resumeId = req.params.resume_id;

//     console.log(JSON.stringify(req.body, null, 2));// 받아온 json형식 파일 확인
//     const {
//         school_name,major,education_date,graduation_id,
//         letter_title,letter_content,
//         photo,resume_email,
//         career_name, career_start ,career_end ,career_work ,career_position,
//         certification_date ,certification_name ,certification_number ,certification_center,
//         training_center, training_start, training_end, training_program,
//         skill_name
//     } = req.body; // 이력서 수정 후 보내지는 데이터
//     // 이력서 작성에 필요한 모든 정보

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();

//         try {
//             await connection.query(`
//                 update resume re
//                 join users u on u.user_id = re.user_id
//                 join cover_letter co on co.letter_id = re.letter_id
//                 join education e on e.education_id = re.education_id
//                 join graduation g on g.graduation_id = e.graduation_id
                
//                 set re.photo = ?, re.resume_email = ?,
//                     e.school_name = ?, e.major = ?, e.education_date = ?, e.graduation_id = ?,
//                     co.letter_title = ?, co.letter_content = ?
//                 where = re.resume_id = ? and u.user_id = ?
//             `,[photo, resume_email,school_name,major, education_date,graduation_id,letter_title,letter_content,resumeId, USER_ID])

//             const career = [] // 임시 변수, req.body에서 가져와야 함
//             if(!career.length===0){
//                 // resume_id에 해당하는 경력 정보 삭제
//                 await connection.query(`
//                     delete from career
//                     where resume_id = ?
//                     `,[resumeId]);

//                 // 수정한 경력 정보 삽입
//                 for(let i=0;i<career.length;i++){
//                     await connection.query(`
//                         insert into career(
//                         career_id, resume_id, career_name, career_start, career_end, career_work, career_position)
//                         values(?, ?, ?, ?, ?, ?, ?)`
//                     ,[i+1,resumeId, career_name[i], career_start[i], career_end[i], career_work[i], career_position[i]]);
//                 }
//             }

//             const certification = [] // 임시 변수, req.body에서 가져와야 함
//             if(!certification.length===0){
//                 // resume_id에 해당하는 자격증 정보 삭제
//                 await connection.query(`
//                     delete from certification
//                     where resume_id = ?
//                     `,[resumeId]);

//                 // 수정한 자격증 정보 삽입
//                 for(let i=0;i<certification.length;i++){
//                     await connection.query(`
//                         insert into certification(
//                         certification_id, 
//                         resume_id, 
//                         certification_date, 
//                         certification_name, 
//                         certification_number, 
//                         certification_center)
//                         values(?, ?, ?, ?, ?, ?)`
//                     ,[i+1, resumeId, certification_date[i], certification_name[i], certification_number[i], certification_center[i]]);
//                 }
//             }

//             const training = [] // 임시 변수, req.body에서 가져와야 함
//             if(!training.length===0){
//                 // resume_id에 해당하는 교육 정보 삭제
//                 await connection.query(`
//                     delete from training
//                     where resume_id = ?
//                     `,[resumeId]);
//                 // 수정 한 교육 정보 삽입
//                 for(let i=0;i<training.length;i++){
//                     await connection.query(`
//                         insert into training(
//                         training_id, resume_id, training_center, training_start, training_end, training_program)
//                         values(?, ?, ?, ?, ?, ?)`
//                     ,[i+1, resumeId, training_center[i], training_start[i], training_end[i], training_program[i]]);
//                 }
//             }

//             const skill = [] // 임시 변수, req.body에서 가져와야 함
//             if(!skill.length===0){
//                 // resume_id에 해당하는 기술 정보 삭제
//                 await connection.query(`
//                     delete from training
//                     where resume_id = ?
//                     `,[resumeId]);
//                 // 수정한 기술 정보 삽입
//                 for(let i=0;i<skill.length;i++){
//                     await connection.query(`
//                         insert into skill(
//                         skill_id, resume_id, skill_name)
//                         values(?, ?, ?)`
//                     ,[i+1, resumeId, skill_name[i]]);
//                 }
//             }

//             res.status(200).json({ message: '이력서 수정 완료'});

//         } catch (err) {
//             console.error('DB 조회 중 오류 발생:', err);
//             res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//         } finally {
//             connection.release(); 
//         }
//     }
//     catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }

// });


// //이력서 삭제 D
// app.delete('/api/resumes/:resume_id', async (req, res) => {
//     const SECRET_KEY = process.env.ACCESS_SECRET;
//     const token = req.cookies.accessToken;

//     const resumeId = req.params.resume_id; // 삭제 할 이력서 id 정보
//     console.log(resumeId);
    
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }
//     try {

//         const connection = await pool.getConnection();

//         try {
//             // 이력서 id로 해당 이력서에 작성된 학력, 자소서 조회
//             const [result] = await connection.query(`
//                 select education_id, letter_id
//                 from resume
//                 where resume_id = ?;`
//             ,[resumeId])
//             const educationId = result[0].education_id;
//             const letterId = result[0].letter_id;
//             console.log(result)
//             console.log(educationId);
//             console.log(letterId);

//             // 해당하는 resume_id의 학력과 자소서 삭제
//             await connection.query(`
//                 delete from resume
//                 where resume_id = ?;
//             `,[resumeId]);

//             await connection.query(`
//                 delete from education
//                 where education_id = ?;
//             `,[educationId]);

//             await connection.query(`
//                 delete from cover_letter
//                 where letter_id = ?;
//             `,[letterId]);

//             res.status(200).json({ 
//                 message: '해당 이력서가 성공적으로 삭제되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 조회 중 오류 발생:', err);
//             res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//         } finally {
//             connection.release(); 
//         }
//     }

//     catch (err) {
//         console.error('토큰 검증 중 오류 발생:', err);
//         return res.status(403).json({ message: 'Forbidden - Invalid token' });
//     }

// });






// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// // 서버 시작
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });



const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');  
const cookieParser = require('cookie-parser');


// const promisePool = require('./promisePool');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(cors());


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



let authCodes = {};



dotenv.config(); // 토큰의 secret key를 .env 파일에 환경 변수로 저장하기 위해서 사용
// 보안적인 이유로 코드에 직접 secret key를 하드코딩하지 않고, 환경 변수로 관리하기 위함
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000', // 클라이언트의 도메인
    credentials: true, // 쿠키와 같은 자격 증명을 허용
};
// app.use(cors());
app.use(cors(corsOptions));
// 같은 컴퓨터에서 작업 할지라도 port가 다르면 Origin이 다르다.
// Origin이 다른 접근은 무조건 막기 때문에 허용하는 작업이 필요하다.






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 로그인 요청 받음
app.post('/api/auth/sign-in',async (req,res)=>{
    // console.log(req.body);
    console.log(JSON.stringify(req.body, null, 2));

    const {ID, PW} = req.body;
    console.log(ID,PW);

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        console.log('DB 연결 성공');
        const [result] = await connection.query(`select * from users where user_email= ? and user_password= ? `,
            // [`${ID}`,`${PW}`]
            [ID,PW]
        )
        console.log(result[0]);

        if (!result[0]) res.json(result)
            else{
                // 유저 정보가 있는경우 진행 ...
                console.log(`유저 정보 담겨있음 : ${result[0].user_id}, ${result[0].user_email}`)
                try{
                    console.log('토큰 만들기 시작')
                // access Token 발급
                // DB에 들어있는 사용자 정보에 접근하기 위한 토큰
                    const accessToken = jwt.sign({
                    // 3가지 인수를 받는다.
                    // 1. 어떤 유저정보를 담을지
                        id : result[0].user_id,
                        user : result[0].user_email
                    }, process.env.ACCESS_SECRET, // 2. 토큰을 생성할 때 만들어지는 비밀키를 담을 환경변수
                    {
                    // 3. 토큰의 유효기간 설정
                        expiresIn: '60m',
                        issuer : 'About Tech',
                    })
                    console.log('토큰 만들기 access')

                // refresh Token 발급
                // Access Token을 갱신하는 용도의 토큰

                const refreshToken = jwt.sign({
                    
                    // access토큰과 똑같이 3가지 인수를 받는다.
                    // 1. 어떤 유저정보를 담을지
                    id : result[0].user_id,
                    user : result[0].user_email
                }, process.env.REFRESH_SECRET, // 2. access와 refresh 선택
                // secret key를 .env 파일에 환경 변수로 안전하게 저장
                {
                    // 3. 토큰의 유효기간 설정 (access토큰을 갱신하기 때문에 기간을 길게 설정)
                    expiresIn: '24h',
                    issuer : 'About Tech',
                })
                console.log('토큰 만들기 refresh')

                // token들을 cookie에 담아서 전송
                res.cookie('accessToken',accessToken,{
                    // 쿠키 속성값
                    // domain: '.http://192.168.0.146:3000',
                    path:'/',
                    secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
                    httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
                    sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
                })
                console.log('accessToken 쿠키 생성')

                res.cookie('refreshToken',refreshToken,{
                    // 쿠키 속성값
                    // domain: '.http://192.168.0.146:3000',
                    path:'/',
                    secure: false,
                    httpOnly: true,
                    sameSite: 'Lax',
                })
                console.log('refreshToken 쿠키 생성')
                res.json(result); // data 전송

                } catch(error){
                    console.error('토큰 생성 중 오류 발생:', error.message);
                    res.json(error); // 에러 반환
                }
            }
            connection.release(); // 커넥션 풀 반환
        

    } catch(err){
        console.error("DB 쿼리 에러 : ",err);
        res.status(500).send('서버에러');
    }


})

// ID 중복 확인 
app.post('/api/id_check', async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
    const {ID} = req.body;

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        console.log('DB 연결 성공');
        const [result] = await connection.query(`select * from users where user_email= ?`,
            [`${ID}`]
        )
        console.log(result[0]);
        res.json(result);

        connection.release(); // 커넥션 풀 반환
        
    } catch(error){
        console.error("DB 쿼리 에러 : ",error);
        res.status(500).send('서버에러');
    }
})

// 회원 탈퇴 요청
app.post('/api/delete', async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
    const {ID} = req.body;

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        await connection.query(`delete from users where user_email=?`,
            [`${ID}`]
        )
        console.log("회원 탈퇴 진행");

        const [result] = await connection.query(`select * from users where user_email= ?`,
            [`${ID}`]
        )
        console.log(result[0]);
        res.json(result);

        connection.release(); // 커넥션 풀 반환

    } catch(error){
        console.error("DB 쿼리 에러 : ",error);
        res.status(500).send('서버에러');
    }
})


// access Token 사용
app.get('/api/accesstoken', (req,res)=>{
    // 사용자마다 다른 서비스 제공
    try{
        // 요청받을 때 담겨있는 쿠키의 accessToken에 할당 된 값을 가져온다.
        console.log('get 접속')
        const token = req.cookies.accessToken;

        // 유저 정보를 특정하기 위한 변수
        // 인자로는 (쿠키에 저장된 토큰값 , 토큰을 생성할 때 만들어진 비밀 키값)
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        // const connection = await pool.getConnection();        
        console.log(data)
        res.json(data);

        // 쿠키에 담겨있는 accessToken의 정보가 DB에 담겨있는 정보와 같은지 비교


    } catch(error){
        console.log("안녕하세요",error.message)
        // res.json(error);
    }
})

// refresh Token 사용
app.get('/api/refreshtoken', (req,res)=>{
    // accessToken을 갱신하는 목적
    try{
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);

        // accessToken 새로 발급
        const accessToken = jwt.sign({
                id : data.user_id,
                user : data.ID
            }, process.env.ACCESS_SECRET,
            {
                expiresIn: '10m',
                issuer : 'About Tech',
            });

            res.cookie('accessToken',accessToken,{
                // 쿠키 속성값
                secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
                httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
                sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
            });

    }catch{

    }

})


// 로그아웃 할 때
app.post('/api/auth/sign-out', (req,res)=>{
    // 쿠키에 저장되어있는 토큰을 삭제, 초기화 작업
    try{
        res.cookie('accessToken',"",{
            expires : new Date(0)
        });
        res.cookie('refreshToken',"",{
            expires : new Date(0)
        })
        res.json('logout !!');
    }
    catch(error){
        res.json(error);
    }
})



// 회원가입
app.post('/api/auth/sign-up', async (req, res) => {
    const { email, password, name, gender, birthDate, phone, address1, address2, url } = req.body;
    const authority = false;
    let connection; // connection 변수를 블록 밖에서 선언

    try {
        // 데이터베이스 연결 가져오기
        connection = await pool.getConnection();
        
        // 회원가입 쿼리 실행
        const [userResult] = await connection.query(`
            INSERT INTO users 
            (
            user_email,
            user_password,
            user_authority
            )
            VALUES 
            (?, ?, ?);
        `, [email, password,authority]);

        const userId = userResult.insertId;

        await connection.query(`
            INSERT INTO user_info 
            (
            info_name,
            info_gender,
            info_birth,
            info_phone_number,
            info_address,
            info_detail,
            info_portfolio,
            user_id
            )
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?);
        `, [name, gender, birthDate, phone, address1, address2, url,userId]);

        res.status(201).json({ 
            code: "SU",
            message: '회원가입 완료.' 
        }); 
    } catch (err) {
        console.error('DB 처리 중 오류 발생:', err);
        res.status(500).json({ 
            code: "DE",
            message: "Database Error", 
        });
    } finally {
        // 커넥션 반환 전에 connection이 정의되었는지 확인
        if (connection) connection.release();
    }
});



// 인증코드 생성
app.post('/api/auth/sign-up/sendcode', async (req, res) => {
    const { email } = req.body;

    try {
        // 6자리 숫자 인증 코드 생성
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 코드 생성 및 만료 시간 설정 (10분)
        const codeCreatedAt = new Date();
        const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); 

        // 인증 코드를 메모리에 저장 
        authCodes[email] = { code: verificationCode, expireTime: codeExpiresAt };

        // 이메일 전송 설정
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '이메일 인증코드 테스트',
            text: `인증코드: ${verificationCode}. 인증을 진행해주세요. 이 코드는 10분간 유효합니다.`
        };

        // 비동기로 이메일 전송
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ success: false, error: '서버 오류로 인해 이메일 전송에 실패했습니다.' });
    }
});


app.post('/api/recode', async (req, res) => {
    const { email } = req.body;

    try {

   
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 코드
        const codeCreatedAt = new Date;
        const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); // 10분 후

        authCodes[email] = { code: verificationCode, expireTime: codeExpiresAt };

  
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '인증코드 재전송',
            text: `인증코드: ${verificationCode}. 인증을 진행해주세요.`
        };

        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send email:', error);
                return res.status(500).json({ success: false, error: '이메일 전송 실패' });
            }
            res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
        });
    } catch (error) {
        console.error('recode:', error);
        res.status(500).json({ success: false, error: '서버 오류로 인해 이메일 재전송에 실패했습니다.' });
    }
});

app.post('/api/verify', async (req, res) => {
    const { email, enteredCode } = req.body;
    console.log(email,enteredCode)
    try {
       
        const storedData = authCodes[email]
        
        if(!storedData) {
            return res.status(400).send('인증코드가 존재하지 않아유')
        }

        const now = Date.now();
        if (now > storedData.expireTime) {
          delete authCodes[email]; // 만료된 인증 코드는 삭제
          return res.status(400).send('인증 코드가 만료되었습니다.');
        }
      
        // 인증 코드가 일치하는지 확인
        if (storedData.code == enteredCode) {
          delete authCodes[email]; // 인증 성공 후에는 인증 코드를 삭제
          return res.send('인증 성공!');
        } else {
          return res.status(400).send('잘못된 인증 코드입니다.');
        }

    } catch (error) {
        console.error('오류', error);
        res.status(500).json({ success: false, error: '인증오류' });
    } 
});









/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// 게시글 전체보기
app.get('/api/boards', async (req, res) => {
    const connection = await pool.getConnection(); 
    try {
        const [result] = await connection.query(`
            SELECT 
                b.board_id,
                b.board_title,
                b.board_date,
                b.board_view,
                u.user_email, 
                c.category
            FROM 
                boards b
            JOIN 
                category c ON b.category_id = c.category_id
            JOIN 
                users u ON b.user_id = u.user_id;
        `); 
        console.log('게시글 전체 보기',result);

        const [Maxview] = await connection.query(`
            SELECT *
            FROM 
                boards
            WHERE board_view = (SELECT MAX(board_view) FROM boards);
        `);
        console.log('조회수 가장 높은 게시글 : ',Maxview);

        res.json({result,Maxview});
    } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    } finally {
        connection.release(); 
    }
});

// 게시글 카테고리별 분류
app.get('/api/boards:category_id', async (req, res) => {

    const connection = await pool.getConnection(); 
    try {
        const category_Id = req.params.category_id;
        console.log('카테고리 : ',category_Id)
        const [result] = await connection.query(`
            select
                b.board_id,
                b.board_title,
                b.board_date,
                b.board_view,
                u.user_email
            FROM 
                boards b
            JOIN 
                users u ON b.user_id = u.user_id
            where b.category_id = ?;
        `,[category_Id]);
        console.log('게시글 카테고리별 조회',result);
        res.json(result); 
    } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    } finally {
        connection.release(); 
    }
});


// 게시글 상세보기
app.get('/api/boards/:board_id', async (req, res) => {
    
    console.log('받은 id :',req.params.board_id);
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    
    const connection = await pool.getConnection();
    try {

        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const board_Id = req.params.board_id;

        const [result] = await connection.query(`
            SELECT 
                b.board_id,
                b.board_title,
                b.board_date,
                b.board_view,
                b.board_content,
                u.user_email as "board_user", 
                c.category,
                co.comment_user,
                co.comment_id,
                co.comment_content,
                co.comment_date
            FROM 
                boards b
            join category c 
                on c.category_id = b.category_id
            JOIN 
                users u ON b.user_id = u.user_id
            LEFT JOIN (
                SELECT
                    co.board_id,
                    u.user_email as "comment_user",
                    co.comment_id,
                    co.user_id,
                    co.comment_content,
                    co.comment_date
                FROM 
                    comment co
                JOIN 
                    users u ON co.user_id = u.user_id  
                WHERE co.board_id = ?
            ) co ON co.board_id = b.board_id 
            WHERE b.board_id = ?;
        `, [board_Id, board_Id]);

        await connection.query(`
            UPDATE boards 
            SET board_view = board_view +1 
            WHERE board_id = ?;
        `, [board_Id]);


        if (result.length === 0) {
            return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
        }
        console.log('게시글 상세보기 : ',result)
        res.json(result); 
    } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    } finally {
        connection.release();
    }
});

// 게시글 쓰기
app.post('/api/boards', (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;
    // console.log(JSON.stringify(req.body, null, 2));

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        const USER_ID = decoded.id;
        const connection = await pool.getConnection();

        const { title, content, category } = req.body;
        const view = 0;

        try {
            const [result] = await connection.query(`
                INSERT INTO boards 
                (board_title, board_content, board_date, board_view, user_id, category_id) 
                VALUES (?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'), ?, ?, ?);
            `, [title, content, view, USER_ID, category]);

            res.status(201).json({ 
                code: "SU",
                message: '게시물이 성공적으로 생성되었습니다.' 
            }); 
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    });
});

// 게시글 수정 ... 보류  
app.put('/api/boards/:board_id', (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;
    const board_Id = req.params.board_id;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        const USER_ID = decoded.id;
        const connection = await pool.getConnection();
        const { TITLE, CONTENTS, CATEGORY } = req.body;

        try {
            const [rows] = await connection.query(`
                SELECT user_id
                FROM boards 
                WHERE board_id = ?;
            `, [board_Id]);

            if (rows.length === 0) {
                return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
            }

            const boardUser_id = rows[0].user_id;

            if (boardUser_id !== USER_ID) {
                return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
            }

            await connection.query(`
                UPDATE boards 
                SET 
                    board_title = ?, 
                    board_content = ?, 
                    board_date = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')
                    category_id = ?
                WHERE board_id = ?;
            `, [TITLE, CONTENTS, board_Id, CATEGORY]);

            res.status(200).json({ 
                code: "SU",
                message: '게시물이 성공적으로 업데이트되었습니다.' 
            });
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    });
});

// 게시글 삭제 
app.delete('/api/boards/:board_id', (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;
    const board_Id = req.params.board_id;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        const USER_ID = decoded.id;
        const connection = await pool.getConnection();

        try {
            const [rows] = await connection.query(`
                SELECT user_id
                FROM boards 
                WHERE board_id = ?;
            `, [board_Id]);

            if (rows.length === 0) {
                return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
            }

            const boardUser_id = rows[0].user_id;

            if (boardUser_id !== USER_ID) {
                return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
            }

            await connection.query(`
                DELETE FROM boards
                WHERE board_id = ?;
            `, [board_Id]);

            res.status(200).json({ 
                code: "SU",
                message: '게시물이 성공적으로 제거되었습니다.' 
            });
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    });
});




























/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 댓글 생성!
app.post('/api/boards/:board_id/comments', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;
    const board_Id = req.params.board_id;
    console.log('받은 board_Id : ',board_Id);
    console.log(req.body)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();
        const { text } = req.body;

        try {
            const [result] = await connection.query(`
                INSERT INTO comment 
                (
                board_id,
                comment_content, 
                comment_date,
                user_id
                )
                VALUES 
                (?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'), ?);
            `, [board_Id, text, USER_ID]);

            res.status(201).json({ 
                code: "SU",
                message: '댓글이 성공적으로 생성되었습니다.' 
            }); 
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});


//댓글수정!
app.put('/api/boards/:board_id/comments/:comment_id', async (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;
    const comment_Id = req.params.comment_id;
    const board_Id = req.params.board_id;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();
        const { CONTENTS } = req.body;

        try {
            // 댓글 작성자 ID 조회
            const [rows] = await connection.query(`
                SELECT user_id
                FROM comment 
                WHERE comment_id = ? and board_id = ?;
            `, [comment_Id, board_Id]);

            if (rows.length === 0) {
                return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            }

            const commentUser_id = rows[0].user_id;

            if (commentUser_id !== USER_ID) {
                return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
            }

            // 댓글 업데이트
            await connection.query(`
                UPDATE comment 
                SET 
                    comment_content = ?,
                    comment_date = DATE_FORMAT(NOW(), '%Y-%m-%d')
                WHERE comment_id = ?;
            `, [CONTENTS, comment_Id]);

            res.status(200).json({ 
                code: "SU",
                message: '댓글이 성공적으로 업데이트되었습니다.' 
            });
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});




//댓글 삭제!
app.delete('/api/boards/:board_id/comments/:comment_id', async (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;
    const comment_Id = req.params.comment_id;
    const board_Id = req.params.board_id;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);
        console.log('comment_Id', comment_Id);
        console.log('board_Id', board_Id);

        const connection = await pool.getConnection();

        try {
            // 댓글 작성자 ID 조회
            const [rows] = await connection.query(`
                SELECT user_id
                FROM comment 
                WHERE comment_id = ? and board_id = ?;
            `, [comment_Id, board_Id]);

            if (rows.length === 0) {
                return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
            }

            const commentUser_id = rows[0].user_id;

            if (commentUser_id !== USER_ID) {
                return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
            }

            // 댓글 삭제
            await connection.query(`
                DELETE FROM comment
                WHERE comment_id = ?;
            `, [comment_Id]);

            res.status(200).json({ 
                code: "SU",
                message: '댓글이 성공적으로 삭제되었습니다.' 
            });
        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });
        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// mypage 접근
app.get('/api/mypage', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

   try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try {
            const [result] = await connection.query(`
                SELECT 
                (
                    SELECT COUNT(*) 
                    FROM comment
                    WHERE user_id = u.user_id
                ) AS comment_count, 
                (
                    SELECT COUNT(*) 
                    FROM boards
                    WHERE user_id = u.user_id
                ) AS board_count,  
                (
                    SELECT COUNT(*) 
                    FROM resume
                    WHERE user_id = u.user_id
                ) AS resume_count,  
                info_name,
                info_name,
                info_gender,
                info_birth,
                info_phone_number,
                info_address,
                info_detail,
                info_portfolio
            FROM 
                user_info u
            WHERE 
                user_id = ?;
            `, [USER_ID]);

            res.json(result); 

        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });

        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});



// mypage 유저 정보 수정
app.put('/api/mypage', async (req, res) => {
    const SECRET_KEY = process.env.REFRESH_SECRET;
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const { name, gender, birthDate, phone, address1, address2
        , portfolio, password } = req.body.changeInfo;

   try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);
        console.log('데이터 : ', req.body)
        console.log(name);

        const connection = await pool.getConnection();

        const [pass] = await connection.query(`
            SELECT 
                user_password
            FROM
                users
            WHERE
                user_id = ?;
                
        `, [ USER_ID ]);


        try {
            if (pass[0].user_password !== password) {
                return res.status(401).json({ message: '비밀번호 오류' });
            }
            const [rows] = await connection.query(`
                UPDATE 
                    user_info AS ui
                INNER JOIN 
                    users AS u
                ON 
                    ui.user_id = u.user_id
                SET 
                    ui.info_name = ?,
                    ui.info_gender = ?,
                    ui.info_birth = ?,
                    ui.info_phone_number = ?,
                    ui.info_address = ?,
                    ui.info_detail = ?,
                    ui.info_portfolio = ?
                WHERE 
                    u.user_id = ?;
            `, [name, gender, birthDate, phone, address1, address2, portfolio, USER_ID]);

            console.log('업데이트', rows)
            res.status(200).json({ 
                code: "SU",
                message: '업데이트 완료' 
            });

        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });

        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});


// 로그인 유저가 작성한 이력서 조회
app.get('/api/mypage/myresumes', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

   try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try {
            const [result] = await connection.query(`
                select re.resume_id, re.resume_email, co.letter_title, co.letter_content
                from resume re
                join users u on u.user_id = re.user_id
                join cover_letter co on co.letter_id = re.letter_id
                where u.user_id = ?;
            `, [USER_ID]);

            console.log(result)
            res.json(result); 

        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });

        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});

// 로그인 유저가 작성한 게시글 조회
app.get('/api/mypage/myboards', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

   try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try {
            const [result] = await connection.query(`
                select 
                    b.board_id, 
                    b.board_title, 
                    b.board_date
                from users u
                join
                    boards b on b.user_id = u.user_id
                where 
                    u.user_id = ?;
            `, [USER_ID]);

            // console.log(`유저 ${USER_ID}이 작성한 게시글 : ${result}`)
            res.json(result); 

        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });

        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});


// 로그인 유저가 작성한 댓글 조회
app.get('/api/mypage/mycomment', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

   try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try {
            const [result] = await connection.query(`
                select
                    c.comment_id, c.comment_content, c.comment_date,c.board_id
                from comment c
                join users u on u.user_id = c.user_id
                where u.user_id = ?;
            `, [USER_ID]);

            // console.log(`유저 ${USER_ID}이 작성한 댓글 : ${result}`)
            res.json(result); 

        } catch (err) {
            console.error('DB 처리 중 오류 발생:', err);
            res.status(500).json({ 
                code: "DE",
                message: "Database Error", 
            });

        } finally {
            connection.release();
        }
    } catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//작성 된 이력서 상세 불러오기
app.get('/api/resumes/:resume_id', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;

    const resumeId = req.params.resume_id
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);
        // USER_ID = 1;

        const connection = await pool.getConnection();

        try {
            // 작성된 이력서를 불러올 때 보여 줄 부분을 정해야 함
            const [resume] = await connection.query(`
                SELECT 
                   ui.info_name, ui.info_gender, ui.info_birth, ui.info_phone_number, ui.info_address,info_detail, info_portfolio,
                   re.photo,re.resume_email,
                   e.school_name, e.major, e.education_date, 
                   g.graduation_category,
                   co.letter_title, co.letter_content
                   from users u
                   join user_info ui on u.user_id = ui.user_id
                   join resume re on re.user_id = u.user_id
                   join cover_letter co on co.letter_id = re.letter_id
                   join education e on e.education_id = re.education_id
                   join graduation g on g.graduation_id = e.graduation_id
                   where u.user_id = ? and re.resume_id = ?;
            `,[USER_ID,resumeId]);

            const [career] = await connection.query(`
                select 
                    car.career_name, car.career_work, car.career_position, car.career_start, car.career_end
                    from career car
                    where car.resume_id = ?;
            `,[resumeId]);

            const [certification] = await connection.query(`
                select 
                    c.certification_name, c.certification_number, c.certification_center, c.certification_date
                    from certification c
                    where c.resume_id = ?;
            `,[resumeId]);

            const [training] = await connection.query(`
                select 
                    t.training_program, t.training_name, t.training_center, t.training_start, t.training_end
                    from training t
                    where t.resume_id = ?;
            `,[resumeId]);

            const [skill] = await connection.query(`
                select 
                    sk.skill_name
                    from skill sk
                    where sk.resume_id = ?;
            `,[resumeId]);
            
            res.json({resume,career,certification,training,skill});

        } catch (err) {
            console.error('DB 조회 중 오류 발생:', err);
            res.status(500).json({ error: 'DB 조회 중 오류 발생' });
        } finally {
            connection.release(); 
        }

    }
    catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
});

// 이력서 쓰기 
// 외래 키로 연결된 테이블에 순차적으로 데이터를 삽입 해야한다.

// 1. users 테이블 -> 2. 인증 테이블, 유저 정보 테이블
// 3. (졸업 테이블 -> 학력 테이블), 자소서 테이블 -> 4. 이력서 테이블
// 4. 이력서 테이블 -> 5. 경력 테이블, 자격증 테이블, 교육 이수 테이블, 기술 테이블
// 3. 보드 테이블 -> 4. 카테고리 테이블, 댓글 테이블
app.post('/api/resumes', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;

    console.log(JSON.stringify(req.body, null, 2));// 받아온 json형식 파일 확인

    const resume_email = "testemail";
    const career_work = "담당 업무";
    // 이력서 작성 후 받은 데이터
    // graduation_id, 학력 입력사항, 사진, 자소서 입력사항, 기술 입력사항, 경력 입력사항, 자격증 입력사항, 교육이수 입력사항

    const {name,major,gdate,graduate} = req.body.education;
    const {academy, description, sdate, edate} = req.body.tranning;
    const {image, title, intro} = req.body;
    const career = req.body.career
    const skill = req.body.skills

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    try{
        // 유저 식별
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try{
            // 로그인 한 유저정보
            const [userInfo] = await connection.query(`
                select
                    u.user_email,
                    ui.info_name, ui.info_gender, ui.info_birth,
                    ui.info_phone_number, ui.info_address,
                    ui.info_detail, ui.info_portfolio
                from users u
                join user_info ui
                    on u.user_id = ui.user_id
                where u.user_id = ?;
            `,[USER_ID]);

            // 순서대로 insert 하기
            // 학력 데이터 삽입 , 필수 입력
            console.log(`학력 데이터 삽입 : ${name}, ${major}, ${gdate}, ${graduate}`)
            const [education] = await connection.query(`
                insert into education(
                school_name, major, education_date, graduation_id)
                values(
                ?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?)
            `,[name, major, gdate, graduate]); 
            const educationId = education.insertId; // INSERT 문이 실행된 후에 AUTO_INCREMENT로 생성된 값을 반환

            //자소서 데이터 삽입, 필수 입력
            console.log(`자소서 데이터 삽입 : ${title}, ${intro}`)
            const [letter] = await connection.query(`
                insert into cover_letter(
                letter_title, letter_content)
                values(
                ?, ?)`
            ,[ title,intro])
            const letterId = letter.insertId; // letter_id 값 가져오기

            // 이력서 데이터 삽입, 필수 입력
            console.log(`이력서 데이터 삽입 : ${educationId}, ${letterId}`)
           
            const [resume] = await connection.query(`
                insert into resume(
                photo, resume_email, education_id, letter_id, user_id)
                values(
                ?, ?, ?, ?, ?)`
            ,[ image, resume_email,educationId, letterId, USER_ID]);
            const resumeId = resume.insertId; // resume_id 값 가져오기

            // 경력 데이터 삽입, 선택
            // const [career] = req.body.career // 임시 변수, req.body에서 가져와야 함

            if(career.length!==0){ // 경력 데이터 작성한 경우만 삽입
                for(let i=0;i<career.length;i++){ // 경력을 여러개 작성 한 경우
                    console.log(`경력 데이터 삽입 : ${career[i].company}`)
                    await connection.query(`
                        insert into career(
                        career_id, resume_id, career_name, career_start, career_end, career_work, career_position)
                        values(?, ?, ?, ?, ?, ?, ?)`
                    ,[i+1, resumeId, career[i].company, career[i].sdate, career[i].edate, career_work, career[i].role]);
                }
            }

            // 자격증 데이터 삽입, 선택
            // const certification = [] // 임시 변수, req.body에서 가져와야 함
            
            // if(certification.length!==0){ // 경력 데이터 작성한 경우만 삽입
            //     for(let i=0;i<certification.length;i++){ // 경력을 여러개 작성 한 경우
            //         await connection.query(`
            //             insert into certification(
            //             certification_id, 
            //             resume_id, 
            //             certification_date, 
            //             certification_name, 
            //             certification_number, 
            //             certification_center)
            //             values(?, ?, ?, ?, ?, ?)`
            //         ,[i+1, resumeId, certification_date[i], certification_name[i], certification_number[i], certification_center[i]]);
            //     }
            // }

            // 교육이수 데이터 삽입, 선택
            // const training = req.body.tranning // 임시 변수, req.body에서 가져와야 함
            
            console.log(`교육이수 데이터 삽입 : ${academy}, ${sdate}, ${edate}, ${description}`)
            await connection.query(`
                insert into training(
                training_id, resume_id, training_name,training_center, training_start, training_end, training_program)
                values(?, ?, ?, ?, ?, ?, ?)`
            ,[1, resumeId, description, academy,sdate, edate, description]);

            // if(training.length!==0){ // 이수 데이터 작성한 경우만 삽입
            //     for(let i=0;i<training.length;i++){ // 경력을 여러개 작성 한 경우
            //         await connection.query(`
            //             insert into training(
            //             training_id, resume_id, training_center, training_start, training_end, training_program)
            //             values(?, ?, ?, ?, ?, ?)`
            //         ,[i+1, resumeId, training, training_start[i], training_end[i], training_program[i]]);
            //     }
            // }

            // 기술 데이터 삽입, 선택
            // const [skill] = req.body.skills // 임시 변수, req.body에서 가져와야 함
            
            if(skill.length!==0){ // 기술 데이터 작성한 경우만 삽입
                for(let i=0;i<skill.length;i++){ // 경력을 여러개 작성 한 경우
                    console.log(`기술 데이터 삽입 : ${skill[i]}`)
                    await connection.query(`
                        insert into skill(
                        skill_id, resume_id, skill_name)
                        values(?, ?, ?)`
                    ,[i+1, resumeId, skill[i]]);
                }
            }

        const resumeData = {
            userInfo : userInfo[0],
            inputData : req.body
        };
        
        res.status(200).json(resumeData);

        } catch (err){
            console.error('DB 조회 중 오류 발생:', err);
            res.status(500).json({ error: 'DB 조회 중 오류 발생' });
        } finally {
            connection.release();
        }
    } catch(err){
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

});


//이력서 수정 U
app.put('/api/resumes/:resume_id', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;

    const resumeId = req.params.resume_id;

    console.log(JSON.stringify(req.body, null, 2));// 받아온 json형식 파일 확인
    const {
        school_name,major,education_date,graduation_id,
        letter_title,letter_content,
        photo,resume_email,
        career_name, career_start ,career_end ,career_work ,career_position,
        certification_date ,certification_name ,certification_number ,certification_center,
        training_center, training_start, training_end, training_program,
        skill_name
    } = req.body; // 이력서 수정 후 보내지는 데이터
    // 이력서 작성에 필요한 모든 정보

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        console.log(`User ID: ${USER_ID}`);

        const connection = await pool.getConnection();

        try {
            await connection.query(`
                update resume re
                join users u on u.user_id = re.user_id
                join cover_letter co on co.letter_id = re.letter_id
                join education e on e.education_id = re.education_id
                join graduation g on g.graduation_id = e.graduation_id
                
                set re.photo = ?, re.resume_email = ?,
                    e.school_name = ?, e.major = ?, e.education_date = ?, e.graduation_id = ?,
                    co.letter_title = ?, co.letter_content = ?
                where = re.resume_id = ? and u.user_id = ?
            `,[photo, resume_email,school_name,major, education_date,graduation_id,letter_title,letter_content,resumeId, USER_ID])

            const career = [] // 임시 변수, req.body에서 가져와야 함
            if(!career.length===0){
                // resume_id에 해당하는 경력 정보 삭제
                await connection.query(`
                    delete from career
                    where resume_id = ?
                    `,[resumeId]);

                // 수정한 경력 정보 삽입
                for(let i=0;i<career.length;i++){
                    await connection.query(`
                        insert into career(
                        career_id, resume_id, career_name, career_start, career_end, career_work, career_position)
                        values(?, ?, ?, ?, ?, ?, ?)`
                    ,[i+1,resumeId, career_name[i], career_start[i], career_end[i], career_work[i], career_position[i]]);
                }
            }

            const certification = [] // 임시 변수, req.body에서 가져와야 함
            if(!certification.length===0){
                // resume_id에 해당하는 자격증 정보 삭제
                await connection.query(`
                    delete from certification
                    where resume_id = ?
                    `,[resumeId]);

                // 수정한 자격증 정보 삽입
                for(let i=0;i<certification.length;i++){
                    await connection.query(`
                        insert into certification(
                        certification_id, 
                        resume_id, 
                        certification_date, 
                        certification_name, 
                        certification_number, 
                        certification_center)
                        values(?, ?, ?, ?, ?, ?)`
                    ,[i+1, resumeId, certification_date[i], certification_name[i], certification_number[i], certification_center[i]]);
                }
            }

            const training = [] // 임시 변수, req.body에서 가져와야 함
            if(!training.length===0){
                // resume_id에 해당하는 교육 정보 삭제
                await connection.query(`
                    delete from training
                    where resume_id = ?
                    `,[resumeId]);
                // 수정 한 교육 정보 삽입
                for(let i=0;i<training.length;i++){
                    await connection.query(`
                        insert into training(
                        training_id, resume_id, training_center, training_start, training_end, training_program)
                        values(?, ?, ?, ?, ?, ?)`
                    ,[i+1, resumeId, training_center[i], training_start[i], training_end[i], training_program[i]]);
                }
            }

            const skill = [] // 임시 변수, req.body에서 가져와야 함
            if(!skill.length===0){
                // resume_id에 해당하는 기술 정보 삭제
                await connection.query(`
                    delete from training
                    where resume_id = ?
                    `,[resumeId]);
                // 수정한 기술 정보 삽입
                for(let i=0;i<skill.length;i++){
                    await connection.query(`
                        insert into skill(
                        skill_id, resume_id, skill_name)
                        values(?, ?, ?)`
                    ,[i+1, resumeId, skill_name[i]]);
                }
            }

            res.status(200).json({ message: '이력서 수정 완료'});

        } catch (err) {
            console.error('DB 조회 중 오류 발생:', err);
            res.status(500).json({ error: 'DB 조회 중 오류 발생' });
        } finally {
            connection.release(); 
        }
    }
    catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

});


//이력서 삭제 D
app.delete('/api/resumes/:resume_id', async (req, res) => {
    const SECRET_KEY = process.env.ACCESS_SECRET;
    const token = req.cookies.accessToken;

    const resumeId = req.params.resume_id; // 삭제 할 이력서 id 정보
    console.log(resumeId);
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const USER_ID = decoded.id;
        const connection = await pool.getConnection();

        try {
            // 이력서 id로 해당 이력서에 작성된 학력, 자소서 조회
            const [result] = await connection.query(`
                select education_id, letter_id
                from resume
                where resume_id = ?;`
            ,[resumeId])
            const educationId = result[0].education_id;
            const letterId = result[0].letter_id;
            console.log(result)
            console.log(educationId);
            console.log(letterId);

            // 해당하는 resume_id의 학력과 자소서 삭제
            await connection.query(`
                delete from resume
                where resume_id = ? and user_id = ?;
            `,[resumeId,USER_ID]);

            await connection.query(`
                delete from education
                where education_id = ?;
            `,[educationId]);

            await connection.query(`
                delete from cover_letter
                where letter_id = ?;
            `,[letterId]);

            res.status(200).json({ 
                message: '해당 이력서가 성공적으로 삭제되었습니다.' 
            });
        } catch (err) {
            console.error('DB 조회 중 오류 발생:', err);
            res.status(500).json({ error: 'DB 조회 중 오류 발생' });
        } finally {
            connection.release(); 
        }
    }

    catch (err) {
        console.error('토큰 검증 중 오류 발생:', err);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// 서버 시작
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});