import express from 'express'
import router from './routers'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log(`App running!\nhttp://localhost:${process.env.PORT}/`)
})

export default app
