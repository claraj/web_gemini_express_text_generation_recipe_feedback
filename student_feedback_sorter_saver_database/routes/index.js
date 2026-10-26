const express = require('express')
const router = express.Router()
const selectDepartments = require('../services/message_sorting')
const databaseModels = require('../model')

Feedback = databaseModels.Feedback


router.get('/', function(req, res, next) {
    res.render('index', {title: 'Feedback app', author: 'Clara'})
})

router.get('/feedback-form', function(req, res, next){
    res.render('student_feedback_form')
})

router.post('/submit-feedback', async function(req, res, next){
    const formData = req.body
    
    let message = formData.comments

    req.body['departments'] = ['a', 'b', 'c']

    const feedback = await Feedback.create(req.body)    // save to DB
    console.log('Saved data', feedback.toJSON())

    res.render('thank_you', { ...formData })    // respond to user. Keep processing the data though - identify departments.  
    
    const departmentResponse = await selectDepartments(message)
    
    let departmentList = JSON.parse(departmentResponse.text)
    console.log(departmentList)
    
    if (departmentList.length == 0) {
        departmentList = ['General college feedback']
    }

    // update the database with the feedback departments 
    const updated = await Feedback.update( {departments: departmentList}, {where: {id: feedback.id}})

    // TODO send the message to the relevant departments 

    // todo log errors 
})

module.exports = router





