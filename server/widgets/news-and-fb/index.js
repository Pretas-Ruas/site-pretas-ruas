/**
 * Widget news main file
 */

module.exports = function (projectPath, Widget) {
  const widget = new Widget('news-and-fb', __dirname);

  widget.viewMiddleware = function viewMiddleware(widget, req, res, next) {

    widget.fbPageId = req.we.systemSettings.fbPageId;
    widget.siteName = (req.we.systemSettings.siteName || req.we.config.appName);

    return req.we.db.models.news
    .findAll({
      where: { published: true },
      order: [
        ['highlighted', 'DESC'],
        ['publishedAt', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: 2
    })
    .then( (p)=> {
      widget.news = p;
      next();
      return null;
    })
    .catch(next);
  };

  return widget;
};