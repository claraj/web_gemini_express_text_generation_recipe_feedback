const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

router.post('/generate_recipe_html', function(req, res, next){

    const formData = req.body
    let userIngredients = formData.ingredients
        
    generateRecipe.generateRecipeHTML(userIngredients).then( recipeHtml => {
        console.log(recipeHtml)
        return res.render('recipe_html', { userIngredients: userIngredients, recipeHtml: recipeHtml })
    }).catch(err => { return next(err) } )
})

router.post('/generate_recipe_json', function(req, res, next){

    const formData = req.body
    let userIngredients = formData.ingredients
        
    generateRecipe.generateRecipeJSON(userIngredients).then( recipeJson => {
        console.log(recipeJson)
        return res.render('recipe_json', { userIngredients: userIngredients, recipeJson: recipeJson })
    }).catch(err => { return next(err) } )
})

module.exports = router


