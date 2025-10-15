import 'dotenv/config'
import express from "express"
import webRoutes from "./routes/web.js"
import authRoutes from "./routes/api/auth.js"
import database from "./config/database.js"
import kamusRoutes from "./routes/api/kamus.js"

const app = express()

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", webRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/kamus", kamusRoutes)


app.listen(process.env.PORT || 3000, () => {
    database()  
    console.log('App berjalan di : http://localhost:3000');
})