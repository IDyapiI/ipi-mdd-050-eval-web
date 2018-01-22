import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host:"http://localhost:5366",
  handleResponse(status, headers, payload) {
    if (status !== 200 && payload && payload.error){
      return payload;
    } else if (status === 0 && payload === ""){
      return {error:"Une erreur technique est survenue"};
    }
    else {
      return this._super(...arguments);
    }
  }
});
