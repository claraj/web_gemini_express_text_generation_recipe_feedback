
const { DataTypes } = require('sequelize')

module.exports = (sequelizeDatabase) => {
    const Feedback = sequelizeDatabase.define(
        'Feedback',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,  // optional, not required 
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,  // optional, not required 
                // validate: {
                //     isEmail: true   // ensure it is in an email format, if it is provided 
                // }
            },
            isCurrentStudent: {
                type: DataTypes.BOOLEAN,  
                allowNull: true   // also not required 
            },            comments: {
                type: DataTypes.STRING,
                allowNull: false    // The only thing a user must include 
            },
            dateSubmitted: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            departments: {
                type: DataTypes.JSON, 
                allowNull: true,
                defaultValue: [] 
            }
        }
    )

    Feedback.sync({force: false}).then( () => console.log('Synced feedback table'))

    return Feedback
}