module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subject", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Subject.associate = (tables) => {
        Subject.hasMany(tables.Teacher, {
            onDelete: 'cascade'
        })
    }

    return Subject
}