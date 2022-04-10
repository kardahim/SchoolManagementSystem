const { Teacher } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    // add teacher
    addTeacher: async (req, res) => {
        const teacher = req.body
        teacher.isAdmin = false
        teacher.StatusId = 1
        bcrypt.hash(teacher.password, 10).then((hash) => {
            teacher.password = hash
            Teacher.create(teacher)
        })
        res.json("ADDED")
    },

    // get all teachers
    getAllTeachers: async (req, res) => {
        const teachers = await Teacher.findAll()
        res.json(teachers)
    },

    // get teacher by id
    getTeacherById: async (req, res) => {
        const id = req.params.id
        const teacher = await Teacher.findByPk(id)
        res.json(teacher)
    },

    // update teacher
    updateTeacher: async (req, res) => {
        const id = req.params.id
        const newTeacher = req.body
        await Teacher.update(newTeacher, { where: { id: id } })
        res.json(newTeacher)
    },

    // delete teacher
    deleteTeacher: async (req, res) => {
        const id = req.params.id
        await Teacher.destroy({ where: { id: id } })
        res.json("DELETED")
    }
}

