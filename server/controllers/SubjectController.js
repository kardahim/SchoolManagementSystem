const { Subject } = require('../models')

module.exports = {
    // add subject
    addSubject: async (req, res) => {
        const subject = req.body
        try {
            await Subject.create(subject)
            res.json(subject)
        }
        catch (error) {
            res.json(error)
        }
    },

    // get all subjects
    getAllSubjects: async (req, res) => {
        const subjects = await Subject.findAll()
        res.json(subjects)
    },

    // get subject by id
    getSubjectById: async (req, res) => {
        const id = req.params.id
        const subject = await Subject.findByPk(id)
        res.json(subject)
    },

    // update subject
    updateSubject: async (req, res) => {
        const id = req.params.id
        const newSubject = req.body
        try {
            await Subject.update(newSubject, { where: { id: id } })
            res.json(newSubject)
        }
        catch (error) {
            res.json(error)
        }
    },

    //delete subject
    deleteSubject: async (req, res) => {
        const id = req.params.id
        try {
            await Subject.destroy({ where: { id: id } })
            res.json("DELETED")
        }
        catch (error) {
            res.json(error)
        }
    }
}
