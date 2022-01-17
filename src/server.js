import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'


const server = express()

const port = process.env.PORT || 3001

server.use(cors())
server.use(express.json())

mongoose.connect(process.env.MONGO_DB)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
  
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })