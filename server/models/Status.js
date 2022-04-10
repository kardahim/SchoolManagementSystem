module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("Status", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Status.associate = (tables) => {
        Status.hasMany(tables.Student, {
            onDelete: 'cascade'
        }),
            Status.hasMany(tables.Teacher, {
                onDelete: 'cascade'
            })
    }

    return Status
}