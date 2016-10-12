App({
  onLaunch: function () {
    const jsonApi = require('utils/jsonapi-datastore/dist/jsonapi-datastore.js')
    this.store = new(jsonApi.JsonApiDataStore)
    this.jsonModel = jsonApi.JsonApiDataStoreModel
  }
})
