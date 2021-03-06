module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("Class", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    Class.associate = (tables) => {
        Class.hasMany(tables.Student, {
            onDelete: 'cascade'
        })
    }
    return Class
}