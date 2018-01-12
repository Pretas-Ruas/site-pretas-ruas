import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  subject: DS.attr('string'),
  formName: DS.attr('string'),
  replyTo: DS.attr('string'),
  to: DS.attr('string'),
  redirectToOnSuccess: DS.attr('string'),

  creator: DS.belongsTo('user', {
    async: true
  }),
  fields: DS.hasMany('d-form-field', {
    inverse: 'form',
    async: true
  }),
  answers: DS.hasMany('d-form-answer', {
    inverse: 'form',
    async: true
  }),
  published: DS.attr('boolean', {
    defaultValue: false
  }),
  publishedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  setAlias: DS.attr('string'),
  linkPermanent: DS.attr('string')
});
