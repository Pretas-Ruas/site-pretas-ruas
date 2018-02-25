/**
 * Widget user-groups main file
 *
 * See https://github.com/wejs/we-core/blob/master/lib/class/Widget.js for all Widget prototype functions
 */

module.exports = function (projectPath, Widget) {
  var widget = new Widget('user-groups', __dirname);

  // // Override default widget class functions after instance
  //
  // widget.beforeSave = function widgetBeforeSave(req, res, next) {
  //   // do something after save this widget in create or edit ...
  //   return next();
  // };

  // // form middleware, use for get data for widget form
  // widget.formMiddleware = function formMiddleware(req, res, next) {
  //
  //   next();
  // }

  // // Widget view middleware, use for get data after render the widget html
  widget.viewMiddleware = function viewMiddleware(widget, req, res, next) {
    const we = req.we;
    const Op = we.Op;

    if (res.locals.model === 'user' && res.locals.data && res.locals.data.id) {
      widget.user = res.locals.data;

      req.we.db.models
      .membership
      .findAll({
        where: {
          [Op.and]: [
            { userId: res.locals.data.id },
            { groupId: { [Op.ne]: null } }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ],
        raw: true,
        limit: 3
      })
      .then( (r)=> {
        if (!r || !r.length) {
          widget.hide = true;
          return null;
        }

        let groupIds = r.map( (g)=> {
          return g.groupId;
        });

        return we.db.models.group
        .findAll({
          where: {
            id: { [Op.in]: groupIds }
          }
        })
        .then( (groups)=> {
          widget.groups = groups;
          return null;
        });
      })
      .then(()=> {
        next();
        return null;
      })
      .catch(next);
    } else {
      return next();
    }
  }

  return widget;
};