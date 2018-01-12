import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const get = Ember.get;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const ENV = Ember.getOwner(this).resolveRegistration('config:environment');

    return Ember.RSVP.hash({
      ENV: ENV,
      record: this.get('store').findRecord('d-form', params.id),
      alias: this.get('store').query('url-alia', {
        target: '/d-form/'+params.id,
        limit: 1,
        order: 'id DESC'
      })
      .then( (r)=> { // get only one alias:
        if (r && r.objectAt && r.objectAt(0)) {
          return r.objectAt(0);
        } else {
          return null;
        }
      })
    });
  },

  afterModel(model) {
    const id = get(model, 'record.id');

    if (
      model.alias && model.alias.alias && model.record && model.record.id
    ) {
      Ember.set(model.record, 'setAlias', Ember.get(model.alias,'alias'));
    } else {
      model.alias = this.get('store').createRecord('url-alia', {
        target: '/d-form/'+id,
        alias: '/d-form/'+id
      });
    }

    if (id) {
      return this.get('store').query('d-form-field', {
        formId: id,
        order: 'weight ASC'
      });
    }
  },

  actions: {
    addItem(type) {
      let field = this.get('store').createRecord('d-form-field', {
        name: null,
        type: type,
        weight: 60
      });

      let form = this.get('currentModel.record');
      field.set('form', form);
    },

    deleteItem(item) {
      if (confirm(`Tem certeza que deseja deletar o campo? \nEssa ação não pode ser desfeita.`)) {
        const state = item.get('currentState.stateName');
        if ( state === 'root.loaded.created.uncommitted') {
          item.deleteRecord();
          return;
        }

        item.destroyRecord()
        .then( ()=> {
          this.get('notifications').success(`Campo deletado.`);
          return null;
        });
      }
    },

    saveForm(form) {
      const fields = form.get('fields');

      let fieldsToUpdate = [];

      for (let i = 0; i < fields.get('length'); i++) {
        let field = fields.objectAt(i);
        // only update if field is changed:
        if (
          field.get('isNew') ||
          Object.keys(field.changedAttributes()).length
        ) {
          fieldsToUpdate.push(field);
        }
      }

      const saves = [];
      // if form is updated:
      if (Object.keys(form.changedAttributes()).length) {
        saves.push(form.save().then((f)=> {
          const fi = f.get('fields');
          return fi.addObjects(fields);
        }));
      }

      fieldsToUpdate.forEach( (f)=> {
        saves.push(f.save());
      });

      window.Promise.all(saves)
      .then( ()=> {
        this.get('notifications').success(`Formulário salvo.`);
        return null;
      });
    },

    /**
     * On sort menu links list
     *
     * @param  {Object} options.event
     * @param  {Object} options.toComponent
     * @param  {Object} options.fromComponent
     * @param  {Object} options.itemComponent
     */
    onSortEnd({ event, toComponent, fromComponent}) {
      console.log(fromComponent.sortedFields, toComponent.sortedFields,
        event.oldIndex, event.newIndex);

      const toFields = get(toComponent, 'sortedFields');
      const fromFields = get(fromComponent, 'sortedFields');

      if (
        fromFields === toFields &&
        event.oldIndex === event.newIndex
      ) {
        return;
      }

      const item = fromFields.objectAt(event.oldIndex);

      let inc = 1;
      for (let i = 0; i < toFields.get('length'); i++) {
        let field = toFields.objectAt(i);
        if ( Number(i) === Number(event.newIndex) ) {
          item.set('weight', i+inc);
          inc++;
        }
        if (field !== item) {
          field.set('weight', i+inc);
        }
      }

      Ember.set(this, 'currentModel.record.updated', true);
    }
  },

  resetFieldsWeight(fields, ctx) {
    for (let i = 0; i < fields.get('length'); i++) {
      this.resetFieldWeight(fields.objectAt(i), ctx);
    }
  },
  resetFieldWeight(field, ctx) {
    ctx.cw++;
    field.set('weight', ctx.cw);
  }
});