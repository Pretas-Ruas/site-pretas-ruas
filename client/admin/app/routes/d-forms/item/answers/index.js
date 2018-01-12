import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
let ENV;
const get = Ember.get;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  init() {
    this._super(...arguments);

    ENV = Ember.getOwner(this).resolveRegistration('config:environment');
  },
  model() {
    const parentModel = this.modelFor('d-forms.item');
    const form = get(parentModel, 'record');

    return  Ember.RSVP.hash({
      ENV: ENV,
      form: form,
      fields: this.get('store').query('d-form-field', {
        formId: form.id,
        order: 'weight ASC'
      }),
      records: this.get('store').query('d-form-answer', {
        formId: form.id
      })
    });
  }
});
