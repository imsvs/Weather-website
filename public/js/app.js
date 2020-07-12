console.log('Client side java script is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=asansol').then((response) => {
//     response.json().then((data) =>{
//         if(data.error){
//             return console.log('Unable to find the weather info')
//         }
//         console.log(data)
//     })
// })
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherform.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ' '
    messageThree.textContent = ' '

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            // return console.log('Unable to find the weather info')
            messageOne.textContent = data.error
        }
        else{
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = 'Weather description :'+ data.forecastData.Weather_description
            messageThree.textContent = 'Current temperature : ' + data.forecastData.Current_temperature + '*C'
        }
    })
})
    
})