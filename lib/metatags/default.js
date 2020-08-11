const setCanonicalURL = require('./setCanonicalURL.js');
const googlePageMapMetatags = require('./googlePageMapMetatags.js');
const setHomePageStructuredData = require('../pageStructuredData/setHomePageStructuredData.js')

function defaultMetatagHandler(req, res, next) {
  const we = req.we;
  const hostname = we.config.hostname;
  const siteName = (req.we.systemSettings.siteName || req.we.config.appName);

  let title = res.locals.title || siteName;
  let description, updatedAt, imgURL, imgHeight, imgWidth;

  setCanonicalURL(req, res);

  res.locals.metatag +=
    '<meta property="og:url" content="'+hostname+req.urlBeforeAlias+'" />'+
    '<meta property="og:title" content="'+title+'" />' +
    '<meta property="og:site_name" content="'+siteName+'" />'+
    '<meta content="'+siteName+'" itemprop="name">'+
    '<meta property="og:type" content="website" />';

  if (we.systemSettings.siteDescription) {
    const description = we.utils.stripTagsAndTruncate (
      we.systemSettings.siteDescription
    );

    res.locals.metatag += '<meta property="og:description" content="'+
      description+
    '" />';
    res.locals.metatag += '<meta content="'+description+'" name="description">';
  }

  if (we.systemSettings.ogImageUrlOriginal) {
    const imageUrl = we.systemSettings.ogImageUrlOriginal
    res.locals.metatag +=
      '<meta property="og:image" content="'+hostname+imageUrl+'" />';
  }

  if (we.systemSettings.metatagKeywords) {
    res.locals.metatag +=
      '<meta name="keywords" content="'+we.systemSettings.metatagKeywords+'" />';
  }

  googlePageMapMetatags(req, res, title, description, updatedAt, imgURL, imgHeight, imgWidth);

  if (res.locals.controller+'/'+res.locals.action === 'main/index') {
    setHomePageStructuredData(req, res);
  }

  next();
}

module.exports = defaultMetatagHandler;