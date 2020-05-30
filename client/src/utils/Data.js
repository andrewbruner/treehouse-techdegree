// Dependencies
import config from './config';

// Data
export default class Data {

  /**
   * Make fetch API call
   * @param {String} path - the API endpoint ('/', '/courses', etc)
   * @param {String} method - the request method ('GET', 'POST', 'PUT', 'DELETE') (default to 'GET')
   * @param {Object} body - the request body (default to null)
   * @param {Boolean} requiresAuth - define authentication requirement (true | false) (default to false)
   * @param {Object} credentials - credentials for authentication ({ emailAddress, password, }) (default to null)
   * @returns {Function} fetch(url, options)
   */

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    
    // URL
    const url = config.apiBaseUrl + path;
  
    // Options
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
};