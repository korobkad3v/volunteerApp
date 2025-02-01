const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Укажите URL вашего фронтенда
    methods: 'GET,POST,PUT,DELETE', // Разрешенные методы
    credentials: true, // Разрешить куки
}));

// Разрешенные IP-адреса
const allowedIPs = ['46.32.185.243', '70.70.248.63', '192.168.56.1', '10.0.0.1', '::1']; // Добавьте нужные IP

// Middleware для проверки IP-адреса
const checkIP = (req, res, next) => {
    const clientIP = req.ip; // Получаем IP клиента
    if (allowedIPs.includes(clientIP)) {
        next(); // Разрешаем доступ
    } else {
        res.status(403).json({ error: `Access denied ${clientIP}` }); // Запрещаем доступ
    }
};

// Применяем middleware для проверки IP для всех маршрутов
app.use(checkIP);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Каталог для сохранения изображений
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Генерация уникального имени файла
    }
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'volconnect_posts'
});

connection.connect(err => {
    if (err) {
        console.error('err connecting:', err.stack);
        return;
    }
    console.log(`db connected as ${connection.threadId}`);
});

// Маршрут для создания нового поста
app.post('/create-post', upload.single('image'), (req, res) => {
    const { title, email, shortDesc, content } = req.body;
    const image = req.file ? req.file.filename : null; // Проверка, было ли загружено изображение

    // Запрос на вставку данных с использованием подготовленного выражения
    const query = 'INSERT INTO posts (title, email, short_desc, content, image_url) VALUES (?, ?, ?, ?, ?)';
    connection.execute(query, [title, email, shortDesc, content, image], (err, results) => {
        if (err) {
            console.error('Error creating post:', err);
            return res.status(500).json({ error: 'Error creating post' });
        }
        res.status(201).json({ message: 'Post created', postId: results.insertId });
    });
});

// Маршрут для получения всех постов (например, для главной страницы)
app.get('/posts', (req, res) => {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Error fetching posts' });
        }
        res.status(200).json(results);
    });
});

// Маршрут для получения поста по ID (для страницы с полным текстом)
app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'SELECT * FROM posts WHERE id = ?';
    connection.execute(query, [postId], (err, results) => {
        if (err) {
            console.error('Error fetching post:', err);
            return res.status(500).json({ error: 'Error fetching post' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: '404 Not Found' });
        }
        res.status(200).json(results[0]);
    });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Запуск сервера
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});