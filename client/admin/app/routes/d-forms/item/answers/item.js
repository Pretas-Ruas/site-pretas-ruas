import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const get = Ember.get;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const parentModel = this.modelFor('d-forms.item');
    const form = get(parentModel, 'record');

    return Ember.RSVP.hash({
      form: form,
      fields: this.get('store').query('d-form-field', {
        formId: form.id,
        order: 'weight ASC'
      }),
      record: this.get('store').findRecord('d-form-answer', params.answerId)
    });
  }
});