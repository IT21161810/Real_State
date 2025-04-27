import express from 'express'
import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/post',postRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/test',testRoute)
app.use('/api/users',userRoute)

app.listen(8800 , () => {
    console.log('Backend server is running!')
})