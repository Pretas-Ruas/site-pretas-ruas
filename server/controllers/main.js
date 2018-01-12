/**
 * Main project controller
 *
 */

module.exports = {
  index(req, res) {
    res.locals.data = { online: true };
    res.ok();
    return null;
  }
};