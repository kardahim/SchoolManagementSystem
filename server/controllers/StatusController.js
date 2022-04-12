const { Status } = require('../models')

module.exports = {
    // add status
    addStatus: async (req, res) => {
        const status = req.body
        try {
            await Status.create(status)
            res.json(status)
        }
        catch (error) {
            res.json(error)
        }
    },

    // get all statuses
    getAllStatuses: async (req, res) => {
        const statuses = await Status.findAll()
        res.json(statuses)
    },

    // get status by id
    getStatusById: async (req, res) => {
        const id = req.params.id
        const status = await Status.findByPk(id)
        res.json(status)
    },

    // update status
    updateStatus: async (req, res) => {
        const id = req.params.id
        const newStatus = req.body
        try {
            await Status.update(newStatus, { where: { id: id } })
            res.json(newStatus)
        }
        catch (error) {
            res.json(error)
        }
    },

    //delete status
    deleteStatus: async (req, res) => {
        const id = req.params.id
        try {
            await Status.destroy({ where: { id: id } })
            res.json("DELETED")
        }
        catch (error) {
            res.json(error)
        }
    }
}
