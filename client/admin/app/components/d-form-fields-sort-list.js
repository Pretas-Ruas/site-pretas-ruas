import Ember from 'ember';

const Sortable = window.Sortable;

export default Ember.Component.extend({
  fields: [],
  sortedFieldsDesc: ['weight:asc'],
  sortedFields: Ember.computed.sort('fields', 'sortedFieldsDesc'),

  group: 'dFormField',

  onSortEnd: 'onSortEnd',
  deleteItem: 'deleteItem',

  parentDepth: null,
  depth: 0,

  classNames: ['d-f-list-group'],

  didInsertElement() {
    // Simple list
    Sortable.create(this.element, {
      group: this.get('group'),
      handle: ".d-f-list-group-item-label",
      animation: 0, // ms, animation speed moving items when sorting, `0` — without animation
      // handle: ".tile__title", // Restricts sort start click/touch to the specified element
      // draggable: ".tile", // Specifies which items inside the element should be sortable
      onEnd: (/**Event*/evt)=> {
        // var itemEl = evt.item;  // dragged HTMLElement
        // evt.to;    // target list
        // evt.from;  // previous list
        // evt.oldIndex;  // element's old index within old parent
        // evt.newIndex;  // element's new index within new parent

        const viewRegistry = Ember.getOwner(this).lookup('-view-registry:main');

        const toComponent = viewRegistry[evt.to.id];
        const fromComponent = viewRegistry[evt.from.id];
        const itemComponent = viewRegistry[evt.item.id];

        this.sendAction('onSortEnd', {
          event: evt,
          toComponent,
          fromComponent,
          itemComponent
        });
      },
    });
  },

  actions: {
    onSortEnd() {
      this.sendAction('onSortEnd', ...arguments);
    },
    deleteItem() {
      this.sendAction('deleteItem', ...arguments);
    }
  }
});
