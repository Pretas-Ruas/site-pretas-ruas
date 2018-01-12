import Ember from 'ember';

export default Ember.Component.extend({
  field: null,
  deleteItem: 'deleteItem',

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
