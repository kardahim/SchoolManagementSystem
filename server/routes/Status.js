const express = require('express')
const router = express.Router()
const controller = require('../controllers/StatusController')

// add status
router.post('/', controller.addStatus)

// get all statuses
router.get('/', controller.getAllStatuses)

// get status by id
router.get('/:id', controller.getStatusById)

// update status
router.put('/:id', controller.updateStatus)

//delete status
router.delete('/:id', controller.deleteStatus)

module.exports = router