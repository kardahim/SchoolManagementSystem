module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subject", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Subject.associate = (tables) => {
        Subject.hasMany(tables.Grade, {
            onDelete: 'cascade'
        })
    }

    return Subject
}