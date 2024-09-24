const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    /**
     * Specifies the destination directory for file uploads.
     *
     * @param {object} req - The request object.
     * @param {object} file - The file object.
     * @param {function} cb - The callback function.
     * @return {void}
     */
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
    password: 'password',
    database: 'mydatabase'
});

connection.connect(err => {
    if (err) {
        console.error('err connecting:', err);
        return;
    }
    console.log('db connected');
});

// Маршрут для создания нового поста
app.post('/create-post', upload.single('image'), (req, res) => {
    const { title, email, shortDesc, content } = req.body;
    const image = req.file ? req.file.filename : null; // Проверка, было ли загружено изображение

    // Запрос на вставку данных с использованием подготовленного выражения
    const query = 'INSERT INTO posts (title, email, shortDesc, content, image) VALUES (?, ?, ?, ?, ?)';
    connection.execute(query, [title, email, shortDesc, content, image], (err, results) => {
        if (err) {
            console.error('Ошибка при создании поста:', err);
            return res.status(500).json({ error: 'Ошибка при создании поста' });
        }
        res.status(201).json({ message: 'Пост успешно создан', postId: results.insertId });
    });
});

// Маршрут для получения всех постов (например, для главной страницы)
app.get('/posts', (req, res) => {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка при получении постов:', err);
            return res.status(500).json({ error: 'Ошибка при получении постов' });
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
            console.error('Ошибка при получении поста:', err);
            return res.status(500).json({ error: 'Ошибка при получении поста' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Пост не найден' });
        }
        res.status(200).json(results[0]);
    });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});