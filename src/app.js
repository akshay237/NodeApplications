const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define path for express config
const directoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handle bars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory for server
app.use(express.static(directoryPath))

//app.com
app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Akshay Beniwal'
    })
})

//app.com/about
app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Akshay Beniwal'
    })
})

//app.com/help
app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help me',
        name : 'Akshay Beniwal',
        message : 'Please Help'
    })
})

//app.com/weather
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must have to provide a address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address:req.query.address,
            })
        })
    })
    // res.send({
    //     forecast : 'Foggy through out the day',
    //     location : 'Bengaluru',
    //     address : req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must have to provide search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[] 
    })
})

//error pages
app.get('/help/*',(req,res) => {
    res.render('page404',{
        title : '404 Error',
        message : 'Help article not found',
        name : 'Akshay Beniwal'
    })
})

app.get('*',(req,res) => {
    res.render('page404',{
        title : '404 Error',
        message : 'Page not found',
        name : 'Akshay Beniwal'
    })
})

app.listen(3000,() =>{
    console.log('Server is up on 3000')
})














// app.com
// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.com/help
// app.get('/help',(req,res) =>{
//     res.send({
//         name : 'Akshay',
//         age : 22,
//         phoneNo : 973914
//     })
// })

// app.com/about
// app.get('/about',(req,res) => {
//     res.send('<h1>About Weather</h1>')
// })

