module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("subjects", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Subject.associate = (tables) => {
        Subject.hasMany(tables.grades, {
            onDelete: 'cascade'
        })
    }

    return Subject
}