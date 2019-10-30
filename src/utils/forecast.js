const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/adb526a526413a50f560bff6a8e07e2b/'+ latitude + ','+ longitude + '?units=si'
    request({url,json:true},(error,{ body}) => {
        if(error){
            callback('Unable to connect with weather services!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +'It is currently ' + body.currently.temperature + ' degrees out.There is ' + body.currently.precipProbability + ' % chance of rain')
        }
    })
}

module.exports = forecast

// const url = 'https://api.darksky.net/forecast/adb526a526413a50f560bff6a8e07e2b/77.59796,12.96991'

// request({url : url,json:true},(error,response) =>{
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.currently)
//     if(error){
//         console.log('Unable to connect with Weather service API!')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     }else{
//         console.log(response.body.daily.data[0].summary +'It is currently ' + response.body.currently.temperature + ' degrees out.There is ' + response.body.currently.precipProbability + ' % chance of rain' )
//     }
// })
