import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    albums: {
      embedded: 'always',
      serialize: 'id'
    },
  }
});
