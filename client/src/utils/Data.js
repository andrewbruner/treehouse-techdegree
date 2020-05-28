// Dependencies
import config from './config';

// Data
export default class Data {

  /**
   * helper method to make fetch API call
   * @param {string} path - the API endpoint
   * @param {string} method - the request method (GET, POST, PUT, DELETE) 
   * @param {object} body - the request body (default of null)
   * @param {boolean} requiresAuth - determine if route requires authentication
   * @param {object} credentials - credentials (emailAddress, password) for authentication access
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    
    // configure fetch call URL
    const url = config.apiBaseUrl + path;
  
    // configure fetch call options object
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    // add request body (if it exists) to options object
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // add Basic Auth Header (if neccessary) to options object
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    // return configured fetch API call
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