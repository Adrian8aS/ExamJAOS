// Import packages
const express = require('express')
const axios = require('axios')
const morgan = require('morgan')

// Using packeges
const app = express()

// Set port for APP
let port = process.env.PORT || 8080

// Middleware
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(200).send("<h1> Bienvenido </h1>")
})

app.get('/health', (req, res) => {
    res.status(200).send("<h1> OK! </h1>")
})

// Defininn Routes POST

// Get info by characters or number
app.post('/Identifier/Pokemon', (req, res) => {

    // Route creation
    const {info} = req.body
    const END_POINT = "https://pokeapi.co/api/v2/pokemon"

    // Route checker
    console.log("Ruta: ",`${END_POINT}/${info}`);

    let result = {id:'',name:'',abilities:[],types:[]}

    axios.get(`${END_POINT}/${info}`)
        .then(function (response){
            const {id, name, abilities, types} = response.data

            result.id = id
            result.name =name

            abilities.forEach(element => {
                result.abilities.push(element.ability.name)
            });
            types.forEach(element => {
                result.types.push(element.type.name)
            });
            
            res.status(200).json(result)
        })
        .catch(function (error){
            console.log(error)
            const {response, message} = error
            res.status(response.status).json({ message })
        })
})


// Defininn Routes GET

// Get all berries
app.get('/Berries', (req, res) => {

    const END_POINT = "https://pokeapi.co/api/v2/berry/?offset=0&limit=64"

    // Route checker
    console.log("Ruta: ",END_POINT);

    let result = {count:0,berries:[]}

    axios.get(END_POINT)
        .then(function (response){
            const {count,results} = response.data

            result.count = count

            results.forEach(element => {
                result.berries.push(element.name)
            });
            result.berries.sort()
            res.status(200).json(result)
        })
        .catch(function (error){
            console.log(error)
            const {response, message} = error
            res.status(response.status).json({ message })
        })
})


// Listen server
app.listen(port, () => {
    console.log("Server running on port "+port)
})