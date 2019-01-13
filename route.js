const express = require('express')

module.exports = (app, http) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', global.config.allow_origin_host)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') return res.end()
    next()
  })
  app.use('/update', express.static('upload'))
  app.use('/download', require('./apiCore/download/download.route'))
  app.use('/v1', require('./api/v1'))
  app.use('/auth', require('./apiCore/auth/auth.route'))

  app.use((req, res, next) => {
    return res.status(404).send('You had lost a map.')
  })

  if (global.config.useSocket) {
    require('./io')(http)
  }
}
