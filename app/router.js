import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('artists', function() {
    this.route('detail', {
      path: '/detail/:artistId'
    });
  });
  this.route('albums');
  this.route('artist-detail', {
    path: '/detail/:artistId'
  });
});

export default Router;
