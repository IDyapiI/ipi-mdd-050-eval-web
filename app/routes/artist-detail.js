import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'artists/detail',
  controllerName: 'artists/detail',
  model(params){
      return this.store.find('artist', params.artistId).catch();
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
