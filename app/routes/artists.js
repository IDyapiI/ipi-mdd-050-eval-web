import Route from '@ember/routing/route';

export default Route.extend({
  page:0,
  size:10,
  sortDirection:"ASC",
  sortProperty:"name",
  name:null,
  queryParams: {
    name: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    sortDirection: {
      refreshModel: true
    },
    sortProperty: {
      refreshModel: true
    }
  },
  model(params){
    if(params.name){
      return this.store.query('artist', {
        name: params.name,
        page: params.page ? params.page : this.get("page"),
        size: params.size ? params.size : this.get("size"),
        sortDirection: params.sortDirection ? params.sortDirection : this.get("sortDirection"),
        sortProperty: params.sortProperty ? params.sortProperty : this.get("sortProperty"),
      });
    }
    return this.store.query('artist', {
      page: params.page ? params.page : this.get("page"),
      size: params.size ? params.size : this.get("size"),
      sortDirection: params.sortDirection ? params.sortDirection : this.get("sortDirection"),
      sortProperty: params.sortProperty ? params.sortProperty : this.get("sortProperty"),
    });
  },
});
