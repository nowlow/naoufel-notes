const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public/')))

app.use((req, res) => {
    return res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(5139, () => {
    console.log('App started on localhost:5139')
})
