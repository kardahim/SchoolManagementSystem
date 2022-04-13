const express = require('express')
const router = express.Router()
const controller = require('../controllers/StudentController')
// const { validateToken } = require('../middlewares/AuthMiddleware')

// add student
router.post('/', controller.addStudent)

// // get all students
router.get('/', controller.getAllStudents)

// // get student by id
router.get('/:id', controller.getStudentById)

// // update student
router.put('/:id', controller.updateStudent)

// //delete student
router.delete('/:id', controller.deleteStudent)

module.exports = router