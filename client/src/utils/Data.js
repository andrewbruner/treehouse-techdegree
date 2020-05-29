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

  // create a user (using user object)
  async createUser(user) {
    
    const response = await this.api('/users', 'POST', user);

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }
  
  // read user (using emailAddress and password)
  async getUser(emailAddress, password) {

    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // create course (using course object and emailAddress and password)
  async createCourse(course, emailAddress, password) {

    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });

    if (response.status === 201) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async deleteCourse(course, emailAddress, password) {

    const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, { emailAddress, password });

    if (response.status === 204) {
      return response.json().then(data => data);
    }
    else if (response.status === 403) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
}