module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("statuses", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Status.associate = (tables) => {
        Status.hasMany(tables.students, {
            onDelete: 'cascade'
        }),
            Status.hasMany(tables.teachers, {
                onDelete: 'cascade'
            })
    }

    return Status
}