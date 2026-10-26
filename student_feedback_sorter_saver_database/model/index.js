const { Sequelize } = require('sequelize')

const configuration = {
    'storage': 'feedback.sqlite',
    'dialect': 'sqlite'
}

const sequelizeDatabase = new Sequelize(configuration)

const models = {}

const createFeedbackModel = require('./feedback')
const feedbackModel = createFeedbackModel(sequelizeDatabase)

const feedbackModelName = feedbackModel.name 
models[feedbackModelName] = feedbackModel    //  { 'Feedback': the feedback model info}

module.exports = models 