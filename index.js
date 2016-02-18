var screenshot    = require('./screenshot.js');
var twitterUpload = require('./twitter-upload.js');
var fs            = require('fs');
var Q             = require('q');
var argv          = require('yargs').argv;

// Check for --pretend and --facebook flags
var pretend = !!(argv.pretend);
var facebook = !!(argv.facebook);

if (!facebook && !pretend) {
  twitterUpload.checkRateLimit().then(function (res) {
    console.log(res);
  }, function (error) {
    console.error(error);
    process.exit();
  });
}

var timestamp = Math.floor(Date.now() / 1000);

var filePath = 'tmp/',
    fileName = 'twitter-' + timestamp + '.png';

var websitePath = 'website/twitter.html';

var settings = {};

if (facebook) {
  settings = {
    screenSize: {
      width: 850,
      height: 315
    },
  };
  fileName = 'facebook-' + timestamp + '.png';
  websitePath = 'website/facebook.html';
}

screenshot.capture(websitePath, filePath + fileName, settings).then(function (res) {
  if (facebook) {
    console.log("Facebook banner done!");
    return res;
  }

  console.log(res);

  var b64content = fs.readFileSync(filePath + fileName, { encoding: 'base64' });
  return twitterUpload.updateProfileBanner(b64content, pretend);
}).then(function (res) {
  if (facebook) {
    return res;
  }

  console.log(res);
  return screenshot.delete(filePath + fileName, pretend);
}).then(function (res) {
  console.log(res);
}).fail(function (error) {
  console.error(error);
  process.exit();
});