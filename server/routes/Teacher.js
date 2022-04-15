const express = require('express')
const router = express.Router()
const controller = require('../controllers/TeacherController')
// TODO: apply middleware
// const { validateToken } = require('../middlewares/AuthMiddleware')

// add teacher
router.post('/', controller.addTeacher)

// // get all teachers
router.get('/', controller.getAllTeachers)

// // get teacher by id
router.get('/:id', controller.getTeacherById)

// // get teacher by StatusId
router.get('/status/:id', controller.getTeacherByStatusId)

// // update teacher
router.put('/:id', controller.updateTeacher)

// //delete teacher
router.delete('/:id', controller.deleteTeacher)

module.exports = router