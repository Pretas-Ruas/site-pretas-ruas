module.exports = {
  find(req, res) {
    if (!req.we.acl.canStatic('access_municipio_unPublished', req.userRoleNames)) {
      res.locals.query.where.published = true;
    }

    const Op = req.we.Op;

    const editorJoin = {
      model: req.we.db.models.user,
      as: 'editors',
      required: false
    };

    res.locals.query.include.push(editorJoin);

    if (req.isAuthenticated()) {
      if (req.query.my) {
        editorJoin.required = true;
        editorJoin.where = {
          id: req.user.id
        };
      }
    }

    // default sort:
    if (!req.query.sort) {
      res.locals.query.order = [
        ['highlighted', 'DESC'],
        ['publishedAt', 'DESC'],
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ];
    }

    if (req.query.q) {
      res.locals.query.where[Op.or] = {
        name: {
          [Op.like]: '%'+req.query.q+'%'
        },
        body: {
          [Op.like]: '%'+req.query.q+'%'
        }
      };
    }

    return res.locals.Model
    .findAndCountAll(res.locals.query)
    .then( (record)=> {
      res.locals.metadata.count = record.count;
      res.locals.data = record.rows;
      return res.ok();
    })
    .catch(res.queryError);
  },

  findOne(req, res, next) {
    if (!res.locals.data) return next();

    // check if can access contents unpublished
    if (!res.locals.data.published) {
      if (!req.we.acl.canStatic('access_contents_unpublished', req.userRoleNames)) {
        return res.forbidden();
      }
    }

    req.we.hooks.trigger('we:after:send:ok:response', {
      res: res, req: req
    }, (err)=> {
      if (err) return res.serverError(err);
      return res.ok();
    });
  },

  /**
   * Create and create page actions
   *
   * @param  {Object} req express.js request
   * @param  {Object} res express.js response
   */
  create(req, res) {
    if (!res.locals.template) {
      res.locals.template = res.locals.model + '/' + 'create';
    }

    if (!res.locals.data) {
      res.locals.data = {};
    }

    if (req.method === 'POST') {
      if (req.isAuthenticated && req.isAuthenticated()) {
        req.body.creatorId = req.user.id;
      }

      req.we.utils._.merge(res.locals.data, req.body);

      return res.locals.Model
      .create(req.body)
      .then(function afterCreate (record) {
        res.locals.data = record;
        res.created();
      })
      .catch(res.queryError);
    } else {
      res.ok();
    }
  },
  /**
   * Edit, edit page and update action
   *
   * Record is preloaded in context loader by default and is avaible as res.locals.data
   *
   * @param  {Object} req express.js request
   * @param  {Object} res express.js response
   */
  edit(req, res) {
    if (!res.locals.template) {
      res.locals.template = res.local.model + '/' + 'edit';
    }

    let record = res.locals.data;

    if (req.we.config.updateMethods.indexOf(req.method) >-1) {
      if (!record) {
        return res.notFound();
      }

      record.updateAttributes(req.body)
      .then( (r)=> {
        // reset editors:
        return r.setEditors([]).then( ()=> r );
      })
      .then( (r)=> {
        // set new editors
        return r.addEditors(req.body.editors)
        .then( ()=> {
          return r;
        });
      })
      .then(function reloadAssocs(n) {
        return n.reload()
        .then(function() {
          return n;
        });
      })
      .then(function afterUpdate (newRecord) {
        res.locals.data = newRecord;
        res.updated();
      })
      .catch(res.queryError);
    } else {
      res.ok();
    }
  }
};