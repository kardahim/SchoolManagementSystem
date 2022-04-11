const express = require('express')
const router = express.Router()
const controller = require('../controllers/SubjectController')

// add subject
router.post('/', controller.addSubject)

// get all subjects
router.get('/', controller.getAllSubjects)

// get subject by id
router.get('/:id', controller.getSubjectById)

// update subject
router.put('/:id', controller.updateSubject)

//delete subject
router.delete('/:id', controller.deleteSubject)

module.exports = router