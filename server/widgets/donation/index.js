/**
 * Donation widget
 */

module.exports = function (projectPath, Widget) {
  const widget = new Widget('donation', __dirname);

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
  widget.viewMiddleware = function viewMiddleware(w, req, res, next) {
    w.ss = req.we.systemSettings;
    next();
  }

  return widget;
};