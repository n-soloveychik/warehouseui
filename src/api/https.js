export class HTTPS {
  static HEADERS = {
    'Content-Type': 'application/json',
  }

  static async get(uri) {
    try {
      return await request(uri, 'GET')
    } catch (error) {
      console.warn('HTTPS: ', error)
      throw error
    }
  }
  static async post(uri, data = {}) {
    try {
      return await request(uri, 'POST', data)
    } catch (error) {
      console.warn('HTTPS: ', error)
      throw error
    }
  }
  static async put(uri, data = {}) {
    try {
      return await request(uri, 'PUT', data)
    } catch (error) {
      console.warn('HTTPS: ', error)
      throw error
    }
  }
  static async delete(uri) {
    try {
      return await request(uri, 'DELETE')
    } catch (error) {
      console.warn('HTTPS: ', error)
      throw error
    }
  }
}

async function request(uri, method = 'GET', data) {
  let init = {
    method,
    headers: HTTPS.HEADERS,
  }
  if (method === 'POST' || method === 'PUT') {
    init = { ...init, body: JSON.stringify(data) }
  }
  const response = await fetch(uri, init)
  return await response.json()
}
