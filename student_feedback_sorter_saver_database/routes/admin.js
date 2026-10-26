const express = require('express')
const router = express.Router() 
const departmentInfo = require('../services/departments.json')
const feedback = require('../model/feedback')
const Feedback = require('../model').Feedback

console.log(departmentInfo)

const departmentNames = departmentInfo.departments.map( d => d.department )

// get page - include list of available departments 

router.get('/', async function(req, res, next) {

    //get all the feedback 
    const allFeedback = await Feedback.findAll()  // GROSS

    // is there a query? find all matching dept feedback 
    console.log(req.query)
    const depName = req.query.department

    if (depName) {
        const departmentFeedback = allFeedback.filter( fb => fb.departments.includes(depName))  // ALSO GROSS
        return res.render('admin', {
            departmentNames: departmentNames, 
            feedbackHeading: depName, 
            feedback: departmentFeedback
        })
    }

    else {   // no department selected 
        return res.render('admin', {
            departmentNames: departmentNames,
            feedbackHeading: 'All Feedback',
            feedback: allFeedback
        })
    }
})


// JSON route for all feedbacks for that department 

module.exports = router