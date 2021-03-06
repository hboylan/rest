/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    <%_ if (typeof passwordReset !== 'undefined' && passwordReset) { _%>
    defaultEmail: 'no-reply@<%= slug %>.com',
    <%_ } _%>
    <%_ if (typeof sendgridKey !== 'undefined' && sendgridKey) { _%>
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    <%_ } _%>
    <%_ if (typeof generateAuthApi !== 'undefined' && generateAuthApi) { _%>
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    <%_ } _%>
    masterKey: requireProcessEnv('MASTER_KEY')
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/<%= slug %>-test',
      options: {
        useMongoClient: true
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/<%= slug %>-dev',
      options: {
        useMongoClient: true,
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/<%= slug %>',
      options: {
        useMongoClient: true
      }
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
