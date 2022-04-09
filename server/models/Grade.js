module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define("grades", {
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

    return Grade
}