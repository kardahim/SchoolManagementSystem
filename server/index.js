const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Routers
const statusRouter = require('./routes/Status')
app.use('/status', statusRouter)
const teacherRouter = require('./routes/Teacher')
app.use('/teacher', teacherRouter)
const classRouter = require('./routes/Class')
app.use('/class', classRouter)

const db = require('./models')
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001")
    })
})