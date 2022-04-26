module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define("Grade", {
        // TODO: add validate
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    Grade.associate = (tables) => {
        Grade.belongsTo(tables.Teacher, {
            onDelete: 'cascade'
        })
    }

    return Grade
}