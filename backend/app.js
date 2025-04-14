import express from 'express'
import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())

app.use(cookieParser())

app.use('/api/post',postRoutes)
app.use('/api/auth',authRoutes)

app.listen(8800 , () => {
    console.log('Backend server is running!')
})