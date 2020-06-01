export class HTTPS {
  static HEADERS = (contentType = 'application/json') => {
    const result = { 'Content-Type': contentType }
    if (localStorage.getItem('token')) {
      result.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return result
  }

  static HEADERS_FOR_FORM_DATA = () => {
    const result = {}
    if (localStorage.getItem('token')) {
      result.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return result
  }

  static async get(uri) {
    try {
      return await request(uri, 'GET')
    } catch (error) {
      return {
        status: 'GET Request',
        data: { message: `ServerError on request ${uri}` },
      }
    }
  }
  static async post(uri, data = {}) {
    try {
      return await request(uri, 'POST', data)
    } catch (error) {
      return {
        status: 'POST Request',
        data: { message: `ServerError on request ${uri}` },
      }
    }
  }
  static async postFormData(uri, formData) {
    try {
      return await request(uri, 'POST', formData)
    } catch (error) {
      return {
        status: 'POST Request',
        data: { message: `ServerError on request ${uri}` },
      }
    }
  }
  static async put(uri, data = {}) {
    try {
      return await request(uri, 'PUT', data)
    } catch (error) {
      return {
        status: 'PUT Request',
        data: { message: `ServerError on request ${uri}` },
      }
    }
  }
  static async delete(uri) {
    try {
      return await request(uri, 'DELETE')
    } catch (error) {
      return {
        status: 'DELETE Request',
        data: { message: `ServerError on request ${uri}` },
      }
    }
  }
}

async function request(uri, method = 'GET', data) {
  let init = { method }
  if (data instanceof FormData) {
    init.headers = HTTPS.HEADERS_FOR_FORM_DATA()
    init.body = data
  } else {
    init.headers = HTTPS.HEADERS()
    if (method === 'POST' || method === 'PUT') {
      init.body = data instanceof FormData ? data : JSON.stringify(data)
    }
  }
  const response = await fetch(uri, init)
  let json = {}
  if (response.headers.get('content-type') === 'application/json') {
    json = await response.json()
  }
  return { data: json, status: response.status }
}
