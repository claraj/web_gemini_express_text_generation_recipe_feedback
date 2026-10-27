const express = require('express')
const router = express.Router() 
const departmentInfo = require('../services/departments.json')
const Feedback = require('../model').Feedback

const departmentNames = departmentInfo.departments.map( d => d.department )

router.get('/', async function(req, res, next) {
    const selectedDepartmentName = req.query.department

    try {

        // get all the feedback 
        const allFeedback = await Feedback.findAll()

        // If there was a department selected, filter to only show feedback for that department 
        // This is inefficient with lots of feedback. A better approach is to query the database for matching feedback
        // however, different databases support (or don't support) different types of JSON query, makes our app more complex. 
        if (selectedDepartmentName) {
            const departmentFeedback = allFeedback.filter( fb => fb.departments.includes(selectedDepartmentName))  
            return res.render('admin', {
                departmentNames: departmentNames, 
                feedbackHeading: selectedDepartmentName, 
                feedback: departmentFeedback
            })
        }

        // Otherwise, no department selected, show all feedback 
        else {   
            return res.render('admin', {
                departmentNames: departmentNames,
                feedbackHeading: 'All Feedback',
                feedback: allFeedback
            })
        }
        
    }
    catch (error) {
        res.locals.message = 'Sorry, error fetching feedback'  // display on the error page 
        next(error)
    }

})

/*

// then/catch version
router.get('/', function(req, res, next) {
    const selectedDepartmentName = req.query.department

    // get all the feedback 
    Feedback.findAll().then(allFeedback => {

        // If there was a department selected, filter to only show feedback for that department 
        // This is inefficient with lots of feedback. A better approach is to query the database for matching feedback
        // however, different databases support (or don't support) different types of JSON query, makes our app more complex. 
        if (selectedDepartmentName) {
            const departmentFeedback = allFeedback.filter( fb => fb.departments.includes(selectedDepartmentName))  // ALSO GROSS
            return res.render('admin', {
                departmentNames: departmentNames, 
                feedbackHeading: selectedDepartmentName, 
                feedback: departmentFeedback
            })
        }

        // Otherwise, no department selected, show all feedback 
        else {   
            return res.render('admin', {
                departmentNames: departmentNames,
                feedbackHeading: 'All Feedback',
                feedback: allFeedback
            })
        }
    }) 

})
    */

module.exports = router