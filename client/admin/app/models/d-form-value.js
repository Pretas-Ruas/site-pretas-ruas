import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),

  values: DS.attr('array'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  answer: DS.belongsTo('d-form-answer', {
    inverse: 'values',
    async: true
  }),

  linkPermanent: DS.attr('string')
});
