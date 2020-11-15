const express = require('express')
const server = express()
const { static } = require('express');
const nunjucks = require('nunjucks')
const recipeData = require('./data')

server.listen(5000)
server.set("view engine", "njk")


nunjucks.configure("views", {
    express:server,
    autoescape:static,
    noCache:false
})
server.use(express.urlencoded( { extended:true }) )
server.use(express.static('public'))

server.get('/', (req, res)=>{
    return res.render("./index", {items:recipeData.slice(0, 6)})
})
server.get('/about', (req,res)=>{
    return res.render("./about")
})
server.get('/recipes', (req,res)=>{
    return res.render("./recipes", {items:recipeData})
})
server.get("/recipehome/:index", function (req, res) {
    const recipe = recipeData // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;
    const theone = recipe[recipeIndex]
    return res.render("./recipehome", {items:recipe[recipeIndex]} )
  })