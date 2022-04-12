const express = require('express')
const router = express.Router()
const controller = require('../controllers/GradeController')

// add grade
router.post('/', controller.addGrade)

// get all grades
router.get('/', controller.getAllGrades)

// get grade by id
router.get('/:id', controller.getGradeById)

// update grade
router.put('/:id', controller.updateGrade)

//delete grade
router.delete('/:id', controller.deleteGrade)

module.exports = router