const express = require('express')
const router = express.Router()
const selectDepartments = require('../services/message_sorting')

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Feedback app', author: 'Clara'})
})

router.get('/feedback-form', function(req, res, next){
    res.render('student_feedback_form')
})

router.post('/submit-feedback', function(req, res, next){
    // get the form data from the URL query 
    const formData = req.body
    
    let message = formData.comments
        
    selectDepartments(message).then( response => {
        let departmentList = JSON.parse(response.text)
        console.log(departmentList)
        if (departmentList.length == 0) {
            departmentList = ['General college feedback']
        }
        return res.render('thank_you', { ...formData, departmentsToContact: departmentList })

        // TODO send the message to the relevant departments 

    }).catch(err => { return next(err) } )

 

})

module.exports = router


