const express = require('express')
const cors = require('cors') 
const app = express()
const devicesController = require('./queries')
const PORT = 3001

app.use(cors())
app.use(express.json())


app.post('/devices/add', devicesController.addDevice)
app.get('/devices', devicesController.getAllDevices)
app.delete('/devices', devicesController.deleteOneDevice)
app.put('/devices', devicesController.editOneDevice)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
