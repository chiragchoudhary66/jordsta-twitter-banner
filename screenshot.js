var webshot = require('webshot');
var del     = require('del');
var Q       = require('q');

var settings = {
  siteType: 'file',
  screenSize: {
    width: 1500,
    height: 500
  },
  quality: 100,
  errorIfJSException: true
};

function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}

exports.capture = function(websitePath, exportPath, overrides, callback) {
  var deferred = Q.defer();
  var webshotSettings = extend(settings, overrides);
  webshot(websitePath, exportPath, webshotSettings, function(error) {
    if (error) deferred.reject(error);

    return deferred.resolve("Screenshot saved! Screenshot of " + websitePath + " saved to " + exportPath);
  });
  return deferred.promise;
};

exports.delete = function(exportPath, pretend, callback) {
  var deferred = Q.defer();
  if (pretend === true) {
    return deferred.resolve("Pretending to delete...");
  }
  del([exportPath]).then(paths => {
    return deferred.resolve("Deleted files and folders:\n" + paths.join("\n"));
  });
  return deferred.promise;
}