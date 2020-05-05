const dotenv = require("dotenv")
dotenv.config({path:'./config.env'})
const mongoose = require('mongoose');

/*process.on("uncaughtException",(err)=>{
    console.log('uncaught Exeption...! shutting down');
    console.log(err.name, err.message);
        process.exit(1);
}) */

const app = require("./app")


const DB = process.env.DATABASE ; 
mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true
  }).then(()=>{console.log(`db connecton success`)})

const port = process.env.PORT ;
const server = app.listen(port,()=>{
    console.log(`app i runnint on port ${port}`)
})

process.on('unhandledRejection',(err)=>{
    console.log('unhandled rejection...! shutting down')
    console.log(err.name, err.message);
    
    server.close(()=>{
        process.exit(1)
    })
})