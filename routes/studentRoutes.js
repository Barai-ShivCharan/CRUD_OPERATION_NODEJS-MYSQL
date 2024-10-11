const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

//router object
const router = express.Router();

//GET ALL STUDENTS LIST   || GET
router.get("/getall", getStudents);

//GET STUDENT BUY ID  || GET
router.get("/get/:id", getStudentById);

//CREATE STUDENT  || POST

router.post("/create", createStudent);

//UPDATE STUDENT
router.put("/update/:id", updateStudent);

//DELETE STUDENT

router.delete("/delete/:id", deleteStudent);

//export the router

module.exports = router;
