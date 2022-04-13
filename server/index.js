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
const studentRouter = require('./routes/Student')
app.use('/student', studentRouter)
const subjectRouter = require('./routes/Subject')
app.use('/subject', subjectRouter)
const gradeRouter = require('./routes/Grade')
app.use('/grade', gradeRouter)
const authRouter = require('./routes/Auth')
app.use('/auth', authRouter)

const db = require('./models')
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001")
    })
})