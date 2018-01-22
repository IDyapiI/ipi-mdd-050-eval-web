import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    if(params.artistId === "new"){
      return this.store.createRecord("artist", {albums:[]});
    } else {
      return this.store.find('artist', params.artistId).catch();
    }
  },
  actions: {
    error(error, transition) {
      if(error.errors){
        error.errors.forEach((er) => {
          this.toast.error("Erreur " + er.status + ", " + er.detail);
        })
      }
    }
  }
});
