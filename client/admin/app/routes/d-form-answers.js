import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    deleteRecord(record) {
      if (confirm(`Tem certeza que deseja deletar a resposta "${record.get('id')}"? \nEssa ação não pode ser desfeita.`)) {
        record.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`A resposta "${record.get('id')}" foi deletada.`);
          this.transitionTo('d-form-answers.index');
          return null;
        });
      }
    },
    save(record, alias) {
      record.save()
      .then( function saveAlias(content) {
        return alias
        .save()
        .then( ()=> {
          return content;
        });
      })
      .then( (r)=> {
        this.get('notifications')
        .success('Dados salvos.');
        // move scroll to top:
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
        return err;
      });
    }
  }
});
