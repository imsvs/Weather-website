const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//app.com
//app.com/about
//app.com/help

//Define paths for Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title:'Weather app',
        name:'Shives Singh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Shives Singh'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: ' Help Yourself',
        title: 'Help',
        name : 'Shives Singh'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }
 
    geocode(req.query.address, (error, {latitude, longitude, location}= {} ) => {
        if (error){
            return res.send({
                error:'Unable to connect to the service'
            })
        }
            forecast( latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:'Unable to find the location.Please provide a correct location'
                    })
                }
                res.send({
                    location,
                    forecastData:forecastData,
                    address:req.query.address
                })
            })    
    })
    // res.send({
    //     forecast : 'Sunny',
    //     location: 'Asansol',
    //     address:req.query.address
    // })
})

// app.get('/products',(req,res) =>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products : []
//     })
// })
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Shives Singh',
        errorMessage: 'Page not found'

    })
})


app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Shives Singh',
        errorMessage: 'Help article not found'

    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})