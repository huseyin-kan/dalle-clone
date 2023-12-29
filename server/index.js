import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'


dotenv.config()
const PORT = 8080

const app = express()

app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})

const startServer = async (req,res) => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server has started on ${PORT}`);
        })
    } catch (error) {
        console.log(error.message);
    }

}

startServer()