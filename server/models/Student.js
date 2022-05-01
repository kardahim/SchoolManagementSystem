module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Student.associate = (tables) => {
        Student.hasMany(tables.Grade, {
            onDelete: 'cascade'
        })
    }

    return Student
}