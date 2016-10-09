App({
  onLaunch: function () {
    this.store = new(this.jsonApi())
  },

  jsonApi: function() {
    const jsonApi = require('node_modules/jsonapi-datastore/dist/jsonapi-datastore.js').JsonApiDataStore
    return jsonApi
  }
})