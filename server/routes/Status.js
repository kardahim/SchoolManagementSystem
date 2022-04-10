const express = require('express')
const router = express.Router()
const { Status } = require('../models')

// add status
router.post('/', async (req, res) => {
    const status = req.body
    await Status.create(status)
    res.json(status)
})

router.get('/', async (req, res) => {
    res.json("test")
})

module.exports = router