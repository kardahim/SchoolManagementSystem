module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("classes", {
        // TODO: add validate
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Class.associate = (tables) => {
        Class.hasMany(tables.students, {
            onDelete: 'cascade'
        })
    }
    return Class
}