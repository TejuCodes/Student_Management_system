CREATE DATABASE college_management;

USE college_management;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age > 0),
    department VARCHAR(100) NOT NULL,
    semester INT CHECK (semester BETWEEN 1 AND 8),
    gender ENUM('Male', 'Female', 'Other') NOT NULL
);
