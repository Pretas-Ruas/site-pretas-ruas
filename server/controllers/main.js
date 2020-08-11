/**
 * Main project controller
 *
 */

module.exports = {
  index(req, res) {
    res.locals.data = { online: true };
    res.ok();
  },

  termsOfUse(req, res) {

    if (!req.we.systemSettings)  {
      return req.badRequest('System settings plugin is required for use terms of use page');
    }

    const ss = req.we.systemSettings;

    if ( !ss.termOfUseId || !ss.termOfUseModel ) {
      return res.goTo('/');
    }

    return res.goTo('/'+ss.termOfUseModel+'/'+ss.termOfUseId);
  }
};