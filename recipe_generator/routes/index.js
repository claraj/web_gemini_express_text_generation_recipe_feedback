const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})


router.post('/generate_recipe', function(req, res, next){

    const formData = req.body
    let userIngredients = formData.ingredients
        
    generateRecipe(userIngredients).then( recipeJson => {
        console.log(recipeJson)
        return res.render('recipe_result', { userIngredients: userIngredients, recipeJson: recipeJson })
    }).catch(err => { return next(err) } )
})

module.exports = router


