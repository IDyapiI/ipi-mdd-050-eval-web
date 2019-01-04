import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash';

var wrapPayload = (payload, typeName) => {
  let wrapped = {};

  wrapped[typeName] = payload;

  return wrapped;
};

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizeResponse(store, modelClass, payload, id, requestType) {
    let normalizedPayload = payload;

    // les pages et tableaux ne doivent pas être traitées ici
    if(payload.content === undefined && !_.isArray(payload)) {
      normalizedPayload = wrapPayload(payload, modelClass.modelName);
    }

    if(payload.albums){
      payload.relationships = {
        "albums": {
          "data": payload.albums
        }
      };
    }

    return this._super(store, modelClass, normalizedPayload, id, requestType);
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let metadata;

    if (payload.content) { // paged response
      metadata = _.omit(payload, 'content');
      payload = payload.content;
    }

    let wrapped = wrapPayload(payload, primaryModelClass.modelName + 's');
    if(metadata){
      wrapped.meta = metadata;
    }

    return this._super(store, primaryModelClass, wrapped, id, requestType);
  },

  // Suppression du json root à la serialisation
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  // Gestion des suppression de manière à ce que le retour en 200 ne pose pas de problème
  normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType) {
    var payload_ = {};
    payload_[primaryModelClass.modelName] = {id: id};
    return this._super(store, primaryModelClass, payload_, id, requestType);
  },

  serialize: function(record, options) {
    var json = this._super.apply(this, arguments); // Get default serialization
    json = _.omit(json, 'albums');

    json.id = parseInt(record.id);  // tack on the id

    return json;
  }
});
