/**
 * Widget user-posts main file
 *
 * See https://github.com/wejs/we-core/blob/master/lib/class/Widget.js for all Widget prototype functions
 */

module.exports = function (projectPath, Widget) {
  var widget = new Widget('user-posts', __dirname);

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
    if (res.locals.model === 'user' && res.locals.data && res.locals.data.id) {
      widget.user = res.locals.data;

      req.we.db.models.post
      .findAll({
        where: {
          creatorId: res.locals.data.id
        },
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 6
      })
      .then( (r)=> {
        if (!r || !r.length) {
          widget.hide = true;
          return null;
        }

        r.forEach( (post)=> {
          post.creator = res.locals.data;
        });

        widget.posts = r;
        return null;
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