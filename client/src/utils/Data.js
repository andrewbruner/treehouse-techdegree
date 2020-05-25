import config from './config';

export default class Data {
  // Add parameters to indicate if request requires authentication (requiresAuth) and the user's credentials (credentials)
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // check if authentication is required
    if (requiresAuth) {
      // initialize the base-64 encoded credentials
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      // set the encoded credentials on a basic authorization headers option
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // add parameters to use in api call
  async getUser(emailAddress, password) {
    // set requiresAuth to true and credentials to object containing username and password
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password});
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
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
