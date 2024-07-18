const { name } = require('./package.json')
const path = require('path')

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(__dirname, './dist/bundle.commonjs.cjs'),
      instances: require('os').cpus().length,
      autorestart: true,
      watch: true,
      cron_restart: '0 3 * * *',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
}
