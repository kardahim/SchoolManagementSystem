const { Subject } = require('../models')

// TODO: add try catch statement
module.exports = {
    // add subject
    addSubject: async (req, res) => {
        const subject = req.body
        await Subject.create(subject)
        res.json(subject)
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
        await Subject.update(newSubject, { where: { id: id } })
        res.json(newSubject)
    },

    //delete subject
    deleteSubject: async (req, res) => {
        const id = req.params.id
        await Subject.destroy({ where: { id: id } })
        res.json("DELETED")
    }
}
