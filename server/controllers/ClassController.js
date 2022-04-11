const { Class } = require('../models')

// TODO: add try catch statement
module.exports = {
    // add class
    addClass: async (req, res) => {
        const classBody = req.body
        await Class.create(classBody)
        res.json(classBody)
    },

    // get all classes
    getAllClasses: async (req, res) => {
        const classes = await Class.findAll()
        res.json(classes)
    },

    // get class by id
    getClassById: async (req, res) => {
        const id = req.params.id
        const classBody = await Class.findByPk(id)
        res.json(classBody)
    },

    // update class
    updateClass: async (req, res) => {
        const id = req.params.id
        const newClass = req.body
        await Class.update(newClass, { where: { id: id } })
        res.json(newClass)
    },

    //delete class
    deleteClass: async (req, res) => {
        const id = req.params.id
        await Class.destroy({ where: { id: id } })
        res.json("DELETED")
    }
}
