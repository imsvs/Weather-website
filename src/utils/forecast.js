const request = require('request')

const forecast = (lat,long,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=c700da9203e8925fee2550854fe39dd6&query=' + lat + ',' + long + '&units=m'

    request({url, json: true} , (error,{body}) => {
        if(error){
            callback('Unable to connect to the service!',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                City_name : body.location.name,
                Weather_description : body.current.weather_descriptions[0],
                Current_temperature : body.current.temperature,
                Feels_like : body.current.feelslike
            })
        }
    })
}


module.exports = forecast