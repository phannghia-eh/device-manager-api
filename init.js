let pap = require('posix-argv-parser')
let args = pap.create()

args.createOption(['-d', '--database'], {
  defaultValue: '',
})
args.createOption(['--prefix'], {
  defaultValue: '',
})

args.createOption(['-i', '--interface'], {
  defaultValue: '127.0.0.1',
})

args.createOption(['-m', '--morgan'], {
  defaultValue: false,
  transform: function(value){
    if (value === '1' || value === 'true')
      return true
    return false
  },
})
args.createOption(['-s', '--socket'], {
  defaultValue: false,
  transform: function(value){
    if (value === '1' || value === 'true')
      return true
    return false
  },
})
args.createOption(['-a', '--allowhostorigin'], {
  defaultValue: '*',
})

args.createOption(['-p', '--port'], {
  defaultValue: 3304,
  transform: function(value){ return parseInt(value, 10) },
})
args.parse(process.argv.slice(2), function(errors, options){
  if (errors) return console.log(errors[0])

  const randomHex = require('crypto').randomBytes(16).toString('hex')
  let config = {
    default_connect_string: options['-d'].value,
    database_prefix: options['--prefix'].value,
    use_database: !!options['-d'].value,
    jwt_secret_key: randomHex,
    upload_path: 'upload/',
    allow_origin_host: options['-a'].value,
    enable_morgan: options['-m'].value,
    listen_interface: options['-i'].value,
    listen_port: options['-p'].value,
    useSocket: options['-s'].value,
  }
  console.log(config)
  require('fs').writeFileSync('./config.json', JSON.stringify(config, 0, 4))
  console.log('Please remove this file if you complete the configuration')
})


