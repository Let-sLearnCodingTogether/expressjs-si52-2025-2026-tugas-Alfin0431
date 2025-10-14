import 'dotenv/config'
import express from "express"
import webRoutes from "./routes/web.js"
import authRoutes from "./routes/api/auth.js"
import database from "./config/database.js"

const app = express()

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", webRoutes)
app.use("/api/auth", authRoutes)

app.listen("3000", () => {
    database()  
    console.log('App berjalan di : http://localhost:3000');
})