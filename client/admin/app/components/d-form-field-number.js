import Ember from 'ember';

const get = Ember.get;

export default Ember.Component.extend({
  field: null,

  deleteItem: 'deleteItem',

  minValue: null,
  maxValue: null,

  minValueChanged: Ember.observer('minValue', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};

    const minValue = get(this, 'minValue');
    if (minValue) {
      formFieldAttributes.min = minValue;
    } else {
      delete formFieldAttributes.min;
    }
    field.set('formFieldAttributes', Ember.copy(formFieldAttributes));
  }),
  maxValueChanged: Ember.observer('maxValue', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};

    const maxValue = get(this, 'maxValue');
    if (maxValue) {
      formFieldAttributes.max = maxValue;
    } else {
      delete formFieldAttributes.max;
    }
    field.set('formFieldAttributes', Ember.copy(formFieldAttributes));
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('minValue', this.get('field.formFieldAttributes.min'));
    this.set('maxValue', this.get('field.formFieldAttributes.max'));
  },

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
