const URL = require('url')

class Utilities {
  static cleanObject(obj) {
    let propNames = Object.getOwnPropertyNames(obj)
    for (let i = 0; i < propNames.length; i++) {
      let propName = propNames[i]
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }

  static proxyParser(proxy) {
    let parsed = new URL(proxy)
    return {
      type: parsed.protocol,
      ip: parsed.hostname,
      port: parsed.port,
    }
  }

  static genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static md5(data) {
    const crypto = require('crypto')
    return crypto.createHash('md5').update(data).digest('hex')
  }

  static createSig(obj) {
    let rawString = Object.keys(obj).sort()
      .map(key => (`${key}=${obj[key]}`)).join('=')
    return Utilities.md5(rawString)
  }

  static paginate(totalItems, paging, items) {
    let totalPage = Math.ceil(totalItems / paging.limit)
    return {
      data: items,
      paging: {
        total: totalItems,
        limit: paging.limit,
        page: paging.page,
      },
    }
  }

  static randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

}

module.exports = Utilities
