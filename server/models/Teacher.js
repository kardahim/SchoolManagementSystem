module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        // TODO: add validate
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
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    })

    Teacher.associate = (tables) => {
        Teacher.hasMany(tables.Grade, {
            onDelete: 'cascade'
        })

        Teacher.hasOne(tables.Class, {
            onDelete: 'cascade'
        })
    }

    return Teacher
}