const { Class } = require('../models')

module.exports = {
    // add class
    addClass: async (req, res) => {
        const classBody = req.body
        try {
            await Class.create(classBody)
            res.json(classBody)
        }
        catch (error) {
            res.json(error)
        }
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
        try {
            await Class.update(newClass, { where: { id: id } })
            res.json(newClass)
        }
        catch (error) {
            res.json(error)
        }
    },

    //delete class
    deleteClass: async (req, res) => {
        const id = req.params.id
        try {
            await Class.destroy({ where: { id: id } })
        }
        catch (error) {
            res.json(error)
        }
        res.json("DELETED")
    }
}
