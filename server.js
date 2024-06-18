const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // 본인의 MySQL 비밀번호
    database: 'weather_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 라우트
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
