/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {String} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */


const path = require('path'),
  metatagContentFindAll = require('./lib/metatags/metatagContentFindAll.js'),
  metatagContentFindOne = require('./lib/metatags/metatagContentFindOne.js');

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  plugin.setConfigs({
    permissions: {
      'access_contents_unpublished': {
        'title': 'Access unpublished contents'
      },
      'view_dashboard': { title: '' },
      'edit_terms_of_use': { title: '' },
      'manage_municipio': { title: '' },
      'access_municipio_unPublished': { title: '' }
    }
  });

  plugin.setRoutes({
    'get /': {
      'controller': 'main',
      'action': 'index',
      'template': 'home/index',
      titleHandler(req, res, next) {
        res.locals.title = '';
        return next();
      }
    },
    'post /newsletter/subscribe': {
      controller: 'newsletter',
      action: 'subscribe',
      responseType: 'json'
    },

    'get /terms-of-use': {
      controller: 'main',
      template: 'terms-of-use',
      action: 'termsOfUse',
      permission: true
    }
  });

  plugin.setResource({
    name: 'content',
    findAll: {
      metatagHandler: 'contentFindAll',
      search: {
        published: {
          parser: 'equalBoolean',
          target: {
            type: 'field',
            field: 'published'
          }
        }
      }
    },
    findOne: { metatagHandler: 'contentFindOne' }
  });

  plugin.setResource({
    name: 'municipio' ,
    // findAll: { metatagHandler: 'municipioFindAll' },
    // findOne: { metatagHandler: 'municipioFindOne' }
  });

  plugin.setMetatagHandlers = function setMetatagHandlers(we) {
    if (we.router.metatag) {
      // override default metatag handler for all routes:
      we.router.metatag.add('default', require('./lib/metatags/default.js'));
      we.router.metatag.add('contentFindOne', metatagContentFindOne);
      we.router.metatag.add('contentFindAll', metatagContentFindAll);
    }
  }

  plugin.hooks.on('we-plugin-user-settings:getCurrentUserSettings', (ctx, done)=> {
    // ctx = {req: req,res: res,data: data}
    plugin.we.db.models['system-setting']
    .findAll()
    .then( (r)=> {
      ctx.data.systemSettings = {};

      if (r) {
        r.forEach( (setting)=> {
          ctx.data.systemSettings[setting.key] = setting.value;
        });
      }

      done();
      return null;
    })
    .catch(done);
  });

  plugin.hooks.on('we-plugin-user-settings:getCurrentUserSettings', (ctx, done)=> {
    // ctx = {req: req,res: res,data: data}
    ctx.data.userPermissions = {};

    if (ctx.req.userRoleNames.indexOf('administrator') > -1) {
      // skip if user id admin:
      return done();
    }

    for (let permission in plugin.we.acl.permissions) {

      if (plugin.we.acl.canStatic(permission, ctx.req.userRoleNames)) {
        ctx.data.userPermissions[permission] = true;
      }
    }

    done();
  });

  plugin.events.on('we:after:load:express', (we)=> {

    if (we.env == 'dev') {
      // Allows cross domain Credentials in ajax
      we.express.use((req, res, next)=>{
        res.set('Access-Control-Allow-Credentials', 'true');
        next();
      });
    }

    we.express.use(plugin.iframeClassMD);
  });

  plugin.iframeClassMD = function iframeClassMD(req, res, next) {
    if (req.query.iframe) {
      res.locals.iframeClass = 'iframe-page-type';
    } else {
      res.locals.iframeClass = '';
    }
    next();
  }

  plugin.events.on('we:after:load:plugins', plugin.setMetatagHandlers);

  return plugin;
};