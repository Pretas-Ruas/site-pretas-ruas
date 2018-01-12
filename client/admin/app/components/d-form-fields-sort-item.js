import Ember from 'ember';

export default Ember.Component.extend({
  onSortEnd: 'onSortEnd',
  deleteItem: 'deleteItem',

  field: null,
  hideForm: true,
  group: null,
  parentDepth: 0,
  classNames: ['d-f-list-group-item'],
  formComponentName: Ember.computed('field.type', function() {
    const type = this.get('field.type');
    if (!type) {
      return null;
    }
    return 'd-form-field-'+type;
  }),

  didReceiveAttrs() {
    if (this.get('field.isNew')) {
      this.set('hideForm', false);
    }
  },

  actions: {
    onSortEnd() {
      this.sendAction('onSortEnd', ...arguments);
    },
    deleteItem() {
      this.sendAction('deleteItem', ...arguments);
    },
    toggleEditForm() {
      this.toggleProperty('hideForm');
    },
    openEditForm() {
      this.set('hideForm', false);
    },
    closeEditForm() {
      this.set('hideForm', true);
    }
  }
});
