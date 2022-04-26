const { Grade, Teacher } = require('../models')

module.exports = {
    // add grade
    addGrade: async (req, res) => {
        const grade = req.body
        try {
            await Grade.create(grade)
            res.json(grade)
        }
        catch (error) {
            res.json(error)
        }
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

    // get grade by studentId
    getGradeByStudentId: async (req, res) => {
        const id = req.params.id
        const grade = await Grade.findAll({ include: Teacher, where: { StudentId: id } })
        res.json(grade)
    },

    // update grade
    updateGrade: async (req, res) => {
        const id = req.params.id
        const newGrade = req.body
        try {
            await Grade.update(newGrade, { where: { id: id } })
            res.json(newGrade)
        }
        catch (error) {
            res.json(error)
        }
    },

    //delete grade
    deleteGrade: async (req, res) => {
        const id = req.params.id
        try {
            await Grade.destroy({ where: { id: id } })
            res.json("DELETED")
        }
        catch (error) {
            res.json(error)
        }
    }
}
