import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  label: DS.attr('string'),
  placeholder: DS.attr('string'),
  help: DS.attr('string'),
  type: DS.attr('string'),
  defaultValue: DS.attr('string'),
  allowNull: DS.attr('boolean', {
    defaultValue: true
  }),
  weight: DS.attr('number'),

  validate: DS.attr(),
  fieldOptions: DS.attr(),
  formFieldAttributes: DS.attr(),

  informationField: Ember.computed('type', function(){
    const type = this.get('type');
    if (type === 'title' || type === 'description') {
      return true;
    }
    return false;
  }),

  publishedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  fields: DS.hasMany('d-form-field', {
    inverse: 'group',
    async: true
  }),
  group: DS.belongsTo('d-form-field', {
    inverse: 'fields',
    async: true
  }),
  form: DS.belongsTo('d-form', {
    inverse: 'fields',
    async: true
  }),

  linkPermanent: DS.attr('string')
});
