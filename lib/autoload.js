const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
module.exports = (path, router) => {

  const isDirectory = source => lstatSync(source).isDirectory()
  const getDirectories = source =>
    readdirSync(source).map(name => join(source, name)).filter(isDirectory)

  getDirectories(path).forEach(directory => {
    let _module = directory.split('\\').pop()
    if (_module) {
      router.use(`/${_module}`, require(join(directory, `${_module}.route`)))
    }
  })
}
