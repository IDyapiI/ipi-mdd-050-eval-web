import Controller from '@ember/controller';

export default Controller.extend({
  ajax: Ember.inject.service(),
  titleToAdd:null,
  actions:{
    save(){
      this.get("model").save().then(() => {
        this.toast.success('Modification effectuée !');
      }).catch((reason) => {
        this.toast.error("Erreur lors de la sauvegarde ! " + reason);
      });
    },
    delete(){
      this.get("model").deleteRecord();
      this.get("model").save().then(() => {
        this.toast.success('Suppression effectuée !');
        this.transitionToRoute("artists.index");
      }).catch((reason) => {
        this.toast.error("Erreur lors de la suppression ! " + reason);
      });
    },
    deleteAlbum(id){
      let album = this.store.peekRecord('album', id);
      album.deleteRecord();
      album.save().then(() => {
        this.toast.success('Suppression effectuée !');
      }).catch((reason) => {
        this.toast.error("Erreur lors de la suppression ! " + reason);
      });
    },
    addAlbum(title){
      let album = this.store.createRecord("album", {
        title:title,
        artist:this.get("model")
      });
      album.save().then(() => {
        this.get("model").reload();
          this.toast.success('Ajout effectué !');
          this.set("titleToAdd", null);
      }).catch((reason) => {
        this.toast.error("Erreur lors de l'ajout ! " + reason);
      });
    }
  }
});
