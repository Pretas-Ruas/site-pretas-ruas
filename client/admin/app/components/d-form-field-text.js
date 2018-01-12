import Ember from 'ember';

export default Ember.Component.extend({
  field: null,

  saveField: 'saveField',
  deleteItem: 'deleteItem',

  actions: {
    save() {
      this.sendAction('saveField', this.get('field'));
    },
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
