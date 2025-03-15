const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college_management"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err);
    } else {
        console.log("Connected to MySQL Database: college_management");
    }
});

app.post("/add", (req, res) => {
    const { name, email, age, department, semester, gender } = req.body;
    const sql = "INSERT INTO students (name, email, age, department, semester, gender) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, email, age, department, semester, gender], (err, result) => {
        if (err) {
            return res.status(500).send("Error adding student: " + err.message);
        }
        res.send("Student added successfully");
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching students: " + err.message);
        }
        res.json(results);
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE student_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send("Error deleting student: " + err.message);
        }
        res.send("Student deleted successfully");
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
