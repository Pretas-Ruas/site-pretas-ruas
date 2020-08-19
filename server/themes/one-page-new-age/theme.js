/**
 * @module  Theme
 * @name    one-age-new-age
 */

module.exports = {
  imageThumbnail: '',
  imageLarge: '',
  description: 'Uma página, apresentando todas as informações relevantes na home e com um slideshow incrível!',

  // theme config
  configs: {
    emailTemplates: {
      path: 'templates/email',
    },
    javascript: 'files/public/script.min.js',
    stylesheet: 'files/public/style-default.css',

    colors: {
      default: {
        label: 'Cor padrão do tema',
        stylesheet: 'files/public/style-default.css',
        colors: [
          { value: '#ab4240' },
          { value: '#fcbd20' },
          { value: '#fdc539' },
          { value: '#000' },
          { value: '#fff' },
          { value: '#222222' },
          { value: '#FFD15A' }
        ]
      },
      gray: {
        label: 'Cores: preto, branco e cinza',
        stylesheet: 'files/public/style-gray.css',
        colors: [
          { value: '#ccc' },
          { value: '#dfdfdf' },
          { value: '#aaa' },
          { value: '#000' }
        ]
      },
      darkgreen: {
        label: 'Cores: verde escuro, branco e vermelho claro nos links',
        stylesheet: 'files/public/style-darkgreen.css',
        colors: [
          { value: '#003929' },
          { value: '#ab4240' },
          { value: '#fff' },
          { value: '#00291e' }
        ]
      },
      lightgreen: {
        label: 'Cores: verde claro, branco e laranja claro nos links',
        stylesheet: 'files/public/style-lightgreen.css',
        colors: [
          { value: '#8aff87' },
          { value: '#FEA313' },
          { value: '#fff' },
          { value: '#00291e' }
        ]
      },
      darkblue: {
        label: 'Cores: azul escuro, branco e laranja claro nos links',
        stylesheet: 'files/public/style-darkblue.css',
        colors: [
          { value: '#22296f' },
          { value: '#022480' },
          { value: '#fff' },
          { value: '#FEA313' }
        ]
      },
      lightblue: {
        label: 'Cores: azul claro e branco',
        stylesheet: 'files/public/style-lightblue.css',
        colors: [
          { value: '#71C3B7' },
          { value: '#182c2f' },
          { value: '#fff' },
          { value: '#FEA313' }
        ]
      }
    }
  },

  autoLoadAllTemplates: true,
  // will be auto loaded
  templates: {},
  // set layouts here
  layouts: {
    'default': {
      template: __dirname + '/templates/server/layouts/default-layout.hbs',
      regions: {
        highlighted: {
          name: 'Destacado'
        },
        sidebar: {
          name: 'Barra lateral'
        },
        profileSidebar: {
          name: 'Barra lateral do perfil'
        },
        content: {
          name: 'Central'
        },
        afterContent: {
          name: 'Depois do conteúdo'
        }
      }
    },
    'user-layout': {
      template: __dirname + '/templates/server/layouts/user-layout.hbs',
      regions: {
        highlighted: {
          name: 'Destacado'
        },
        profileSidebar: {
          name: 'Barra lateral do perfil'
        },
        content: {
          name: 'Central'
        },
        afterContent: {
          name: 'Depois do conteúdo'
        }
      }
    },
    'fullwidth': {
      template: __dirname + '/templates/server/layouts/full-width-layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        }
      }
    },
    'home': {
      template: __dirname + '/templates/server/layouts/home.hbs',
      regions: {
        highlighted: {
          name: 'Destacado'
        },
        content: {
          name: 'Central'
        },
        afterContent: {
          name: 'Depois do conteúdo'
        }
      }
    }
  },
  widgets: {
    'html': __dirname + '/templates/server/widgets/html-widget.hbs',
    'news': __dirname + '/templates/server/widgets/news.hbs',
    'simple-event': __dirname + '/templates/server/widgets/simple-event.hbs'
  }
};
