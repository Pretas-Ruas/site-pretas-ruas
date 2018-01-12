import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),

  vCache: DS.attr('array'),
  vCacheByFieldId: Ember.computed('vCache', function() {
    const vCache = this.get('vCache');
    const byFID = {};
    for (var i = 0; i < vCache.get('length'); i++) {
      let v = vCache.objectAt(i);
      byFID[v.fieldId] = v.value;
    }

    return byFID;
  }),

  creator: DS.belongsTo('user', {
    async: true
  }),
  values: DS.hasMany('d-form-value', {
    inverse: 'answer',
    async: true
  }),
  form: DS.belongsTo('d-form', {
    inverse: 'answers',
    async: true
  }),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  linkPermanent: DS.attr('string')
});
