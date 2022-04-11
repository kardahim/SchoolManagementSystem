const express = require('express')
const router = express.Router()
const controller = require('../controllers/ClassController')

// add class
router.post('/', controller.addClass)

// // get all classes
router.get('/', controller.getAllClasses)

// // get class by id
router.get('/:id', controller.getClassById)

// // update class
router.put('/:id', controller.updateClass)

// //delete class
router.delete('/:id', controller.deleteClass)

module.exports = router