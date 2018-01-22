import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['name', 'page', 'size', 'sortDirection', 'sortProperty'],
  page:0,
  name:null,
  size:10,
  sortDirection:"ASC",
  sortProperty:"name",
  actions:{
    sortBy(sortProperty){
      this.transitionToRoute("artists.index", {queryParams:{name: this.get("name"), page: this.get("page"), size: this.get("size"), sortProperty:sortProperty, sortDirection: this.get("sortDirection") === "ASC" ? "DESC" : "ASC"}});
    }
  }
});
