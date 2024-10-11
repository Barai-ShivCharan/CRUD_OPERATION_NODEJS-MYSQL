const db = require("../config/db");

//GET ALL STUDENTS LIST

const getStudents = async (req, res) => {
  try {
    const data = await db.query(" SELECT * FROM students");
    if (!data) {
      res.status(404).send({
        success: false,
        message: "No Record Founds",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Records found",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all Students API",
      error,
    });
  }
};

//GET STUDENT BY ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid or Provide students id",
      });
    }
    const data = await db.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]);
    if (!data) {
      res.status(404).send({
        success: false,
        message: "No Student Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Record Found",
      StduentDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get student by id API",
    });
  }
};

//ADD NEW STUDENT
const createStudent = async (req, res) => {
  try {
    const { name, roll_no, gpa, fees, medium } = req.body;
    if (!name || !roll_no || !gpa || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const data = await db.query(
      `INSERT INTO students (name, roll_no, gpa, fees, medium) VALUES (?,?,?,?,?)`,
      [name, roll_no, gpa, fees, medium]
    );
    if (!data) {
      res.status(400).send({
        success: false,
        message: "Failed to add new Student",
      });
    }
    res.status(201).send({
      success: true,
      message: "New Student Added Successfully",
      newStudentId: data.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Add new Student API",
      error,
    });
  }
};

//UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid or Provide students id",
      });
    }
    const { name, roll_no, gpa, fees, medium } = req.body;

    const data = await db.query(
      `UPDATE students  SET name=?,roll_no=?,gpa=?,fees=?,medium=? WHERE id=?`,
      [name, roll_no, gpa, fees, medium, studentId]
    );
    if (!data) {
      res.status(500).send({
        success: false,
        message: "Error in  Update Data",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Record Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Student API",
      error: error,
    });
  }
};

//DELETE STUDENT

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid or Provide students id",
      });
    }
    const data = await db.query(`DELETE FROM students WHERE id=?`, [studentId]);
    if (!data) {
      res.status(500).send({
        success: false,
        message: "Error in Delete Student API",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Student API",
      error: error,
    });
  }
};
module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
