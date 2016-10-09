App({
  onLaunch: function () {
    const jsonApi = require('node_modules/jsonapi-datastore/dist/jsonapi-datastore.js')
    this.store = new(jsonApi.JsonApiDataStore)
    this.jsonModel = jsonApi.JsonApiDataStoreModel
  }
})
