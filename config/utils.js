const chalk = require('chalk')

module.exports = {
  /**
   *
   * define process.env.${key} = value
   * @param {Object} defs
   * @return {Object}
   */
  resolveConsts (defs) {
    const resolved = Object.keys(defs).reduce((val, k) => {
      // val[`process.env.${k}`] = JSON.stringify(defs[k])
      val[k] = JSON.stringify(defs[k])
      return val
    }, {})

    return resolved
  },

  /**
   *
   *  获取所有APP_开头的环境变量
   */
  resolveEnvs () {
    const envs = Object.keys(process.env).reduce((ret, key) => {
      const val = process.env[key]
      if (key.indexOf('APP_') >= 0) {
        console.log(chalk.green(`${key}=${val}`))
        ret[key] = val
      }

      return ret
    }, {})

    return envs
  }
}