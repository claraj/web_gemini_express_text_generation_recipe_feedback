const express = require('express')
const router = express.Router()
const selectDepartments = require('../services/message_sorting')
const databaseModels = require('../model')
const feedback = require('../model/feedback')

Feedback = databaseModels.Feedback

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Feedback app', author: 'Clara'})
})

router.get('/feedback-form', function(req, res, next){
    res.render('student_feedback_form')
})

router.post('/submit-feedback', async function(req, res, next){
    const formData = req.body
    const message = formData.comments

    let feedback 
    let departmentList 

    try {
        feedback = await Feedback.create(req.body)    // save to DB
        console.log('Saved data', feedback.toJSON())
        res.render('thank_you', { ...formData })    // respond to user. Keep processing the data though - identify departments and update  
    } catch (error) { 
        console.error(`Failed saving data ${req.body} because ${error}`)  // for developers 
        res.locals.message = 'Error saving data to the database. Please try again later'
        return next()  // for users. End response
    }

    try {
        console.log('Making LLM request for message', message)
        const departmentResponse = await selectDepartments(message)
    
        departmentList = JSON.parse(departmentResponse.text)
        if (departmentList.length == 0) {
            departmentList = ['General college feedback']
        }
        console.log(departmentList)
        
    } catch (error) { 
        console.error(`Failed LLM identification of departments for message "${message}" because ${error}`)  // for developers 
        return  // End response processing function, don't procede to saving in database. We already sent a response to the user
    }

    try {    
        // update the database with the feedback departments 
        console.log('Updating database with departments', departmentList)
        await Feedback.update( {departments: departmentList}, {where: {id: feedback.id}})

    } catch (error) { 
        console.error(`Failed saving departments for feedback ID "${feedback.id}" because ${error}`)  // for developers 
    }

})

module.exports = router





