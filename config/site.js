// var path = require('path');
module.exports = {
  isONG: true,
  appName: 'Site',
  subtitle: 'Nome do site',

  // default favicon, change in your project config/local.js
  // favicon: path.resolve(__dirname, '..', 'files/public/favicon.png'),
  // logo public url path
  appLogo: '/public/project/logo.jpg',

  site: {
    homeBg :'/public/project/home-bg.jpg'
  },

  notification: {
    /**
     * time to wait after an notification is created to send in  notification email
     * @type {Object}
     */
    waitMinutesForSendEmail: 10
  },

  passport: {
    strategies: {
      facebook: {
        clientID: 'TODO',
        clientSecret: 'TODO'
      }
    }
  },

  fileHostname: '',
  fileImageHostname: '',

  acl: {
    disabled: false
  },

  enableRequestLog: false,
  upload: {
    // defaultImageStorage: null,
    // defaultFileStorage: null,
    image: {
      avaibleStyles: [
        'thumbnail',
        'medium',
        'large',
        'banner',
        'bannerbig',
        'slide',
        'eventBanner'
      ],
      styles: {
        thumbnail: { width: '75', heigth: '75' },
        medium: { width: '250', heigth: '250' },
        large: { width: '640', heigth: '400' },
        banner: { width: '900', heigth: '300' },
        bannerbig: { width: '1920', heigth: '650' },
        slide: { width: '1620', heigth: '1080' },
        eventBanner: { width: '1920', heigth: '250' }
      }
    }
  },

  latestCommentLimit: 4,// limit for preloaded comments
  comments: {
    models:  {
      // enable comments in models:
      post: true,
      content: true,
      article: true,
      cfnews: true
    }
  },

  flag: {
    models: {
      post: true
    }
  },

  follow: {
    models: {
      post: true
    }
  }
};