import Ember from 'ember';

let ENV;
let editorLocaleCache, editorLocaleUrlCache;

export default Ember.Component.extend({
  field: null,
  deleteItem: 'deleteItem',

  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),
  settings: Ember.inject.service('settings'),
  upload: Ember.inject.service('upload'),

  editorOptions: Ember.computed('settings.data', {
    get() {
      const opts = {
        min_height: 200,
        theme: 'modern',
        convert_urls: false,
        branding: false,
        extended_valid_elements: 'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',
        plugins: [
          'autolink lists link image hr anchor',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table directionality',
          'emoticons paste textcolor codesample'
        ],
        toolbar1: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media |  codesample',
        language: this.getEditorLocale(),
        language_url: this.getEditorLocaleUrl(),

        file_browser_callback_types: 'image',
        file_picker_callback: this.get('upload').get_file_picker_callback()
      };
      return opts;
    }
  }),

  init() {
    this._super(...arguments);
    ENV = Ember.getOwner(this).resolveRegistration('config:environment');
  },

  getEditorLocale() {
    if (editorLocaleCache) {
      return editorLocaleCache;
    }

    let locale = this.get('settings.data.activeLocale');
    // use default en-us locale
    if (!locale || locale === 'en' || locale === 'en-us') {
      return null;
    }

    if (locale.indexOf('-') > -1) {
      const parts = locale.split('-');
      // Locales with more than 2 parts not are supported
      // TODO!
      if (parts.length > 2) {
        return null;
      }
      // Converts the seccond part of the locale to uppercase:
      parts[1] = parts[1].toUpperCase();
      // override the locale?
      locale = parts.join('_');
    } else {
      return null;
    }

    editorLocaleCache = locale;

    return editorLocaleCache;
  },

  getEditorLocaleUrl() {
    if (editorLocaleUrlCache) {
      return editorLocaleUrlCache;
    }

    let locale = this.get('settings.data.activeLocale');
    // use default en-us locale
    if (!locale || locale === 'en' || locale === 'en-us') {
      return null;
    }

    if (locale.indexOf('-') > -1) {
      const parts = locale.split('-');
      // Locales with more than 2 parts not are supported
      // TODO!
      if (parts.length > 2) {
        return null;
      }
      // Converts the seccond part of the locale to uppercase:
      parts[1] = parts[1].toUpperCase();
      // override the locale?
      locale = parts.join('_');
    } else {
      return null;
    }

    editorLocaleUrlCache = `/admin/tiny-mce-languages/${locale}.js`;

    return editorLocaleUrlCache;
  },


  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
