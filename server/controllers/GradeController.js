const { Grade } = require('../models')

// TODO: add try catch statement
module.exports = {
    // add grade
    addGrade: async (req, res) => {
        const grade = req.body
        await Grade.create(grade)
        res.json(grade)
    },

    // get all grades
    getAllGrades: async (req, res) => {
        const grades = await Grade.findAll()
        res.json(grades)
    },

    // get grade by id
    getGradeById: async (req, res) => {
        const id = req.params.id
        const grade = await Grade.findByPk(id)
        res.json(grade)
    },

    // update grade
    updateGrade: async (req, res) => {
        const id = req.params.id
        const newGrade = req.body
        await Grade.update(newGrade, { where: { id: id } })
        res.json(newGrade)
    },

    //delete grade
    deleteGrade: async (req, res) => {
        const id = req.params.id
        await Grade.destroy({ where: { id: id } })
        res.json("DELETED")
    }
}
