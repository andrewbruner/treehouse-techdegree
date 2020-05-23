import config from './config';

export default class Data {

	// helper method for making fetch() calls to REST API
	const api = (path, method = 'get', body = null, requiresAuth = false, credentials = null) => {
	
		// define url for fetch() call
		const url = `${config.apiBaseUrl}${path}`;

		// define options for fetch() call
		const options = {
			
			method: method,
			
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		};

		// attatch body to options if present
		if (body !== null) {
			options.body = JSON.stringify(body);
		}

		// attatch Auth Header to options if required
		if (requiresAuth) {

			const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
			
			options.headers['Authorization'] = `Basic ${encodedCredentials}`;
		}

		// make fetch() call to url using above defined options
		return fetch(url, options);
	};

	// helper method for getting current user
	const getUser = async (username, password) => {
		
		// use api() helper method to return current user
		const response = await this.api('/users', 'get', null, true, { username, password });

		// if status ok, return user data
		if (response.status === 200) {
			return response.json().then(data => data);
		// else if status unauthorized, return null
		} else if (response.status === 401) {
			return null;
		// else throw new Error()
		} else {
			throw new Error();
		}
	};

	// helper method for creating new user
	const createUser = (user) => {
		
		// use api() helper method to create new user
		const response = await this.api('/users', 'post', user);

		// if status created, return empty array
		if (response.status === 201) {
			return [];
		// else if status bad request, return data.errors
		} else if (response.status === 400) {
			return response.json().then(data => data.errors);
		// else throw new Error()
		} else {
			throw new Error();
		}
	};
};
