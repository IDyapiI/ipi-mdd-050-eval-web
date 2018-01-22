import Controller from '@ember/controller';

export default Controller.extend({
  name:null,
  actions:{
    rechercher(){
      this.transitionToRoute("artists.index", {queryParams:{name:this.get("name"), page: 0, size: 10, sortProperty:"name", sortDirection: "ASC"}});
    }
  }
});
