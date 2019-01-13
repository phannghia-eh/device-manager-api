try {
  global.config = require('./config')
} catch (e){
  console.log('\x1b[31m%s\x1b[0m', 'Please run config first: node init')
  process.exit(0)
}
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

let app = express()

if (global.config.use_database){
  require('./lib/database/mongodb').openDatabase(global.config.default_connect_string, () => {
    require('./seeding.database')
  })
}
if (global.config.enable_morgan){
  const morgan = require('morgan')
  app.use(morgan('combined'))
}

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))

global.upload = multer({dest: global.config.upload_path})
global.projectPath = __dirname
global.Utilities = require('./lib/Utilities')

global.ApiException = require('./lib/Entity/ApiException').ApiException
global.ErrorCode = require('./lib/Entity/ApiException').ErrorCode
global.ApiResponseArray = require('./lib/Entity/ApiResponseArray')
global.ApiResponseMessage = require('./lib/Entity/ApiResponseMessage')
global.ApiResponseObject = require('./lib/Entity/ApiResponseObject')

const http = require('http').Server(app)

require('./route')(app, http)

let port = process.env.PORT || global.config.listen_port || 3333
http.listen(port, global.config.listen_interface)
console.log('App is listening at port ' + port)
