module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subject", {
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