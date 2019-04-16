
// used to perform network calls

const networkMixin = {
  methods: {
    makeNetworkRequest(url, options = {}) {
      let uri = 'https://api.github.com';

      let headers = options.headers || {};
      delete options.headers;

      let defaultHeaders = {
        'Content-Type': 'application/json'
      }

      headers = Object.assign({}, defaultHeaders, headers);

      let requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        headers
      };

      url = `${uri}/${url}`;
      requestOptions = Object.assign({}, requestOptions, options);

      return fetch(url,requestOptions)
        .then(response => {
          return this.checkStatus(response);
        })
        .catch(function(error) {
          throw error;
          console.error('Request failed', error); // eslint-disable-line
        });
    },

    checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    },
    
    isJson(response) {
      return response.json()
    }
  }
};

export default networkMixin;
