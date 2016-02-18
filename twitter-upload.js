var env     = require('dotenv').config();
var twitter = require('twitter');
var Q       = require('q');

var client = new twitter({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token_key:     process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
});

exports.checkRateLimit = function() {
  var deferred = Q.defer();
  client.get('application/rate_limit_status', { resources: 'users' }, function(error, tweets, response) {
    if (error) deferred.reject(error);

    var rateLimitStatus = tweets.resources.users['/users/profile_banner'];

    // Let's keep a buffer of 10 remaining
    if (rateLimitStatus.remaining <= 10) {
      deferred.reject(new Error('Rate limited. Halting...'));
    }

    return deferred.resolve("Rate Limit status: " + JSON.stringify(rateLimitStatus));

  });
  return deferred.promise;
};

exports.updateProfileBanner = function (b64content, pretend, callback) {
  var deferred = Q.defer();
  if (pretend === true) {
    return deferred.resolve("Pretending to post...");
  }
  client.post('account/update_profile_banner', {
    banner: b64content
  }, function(error, tweets, response) {
    // node-twitter currently doesn't allow 201/202 status codes
    // fixed in https://github.com/desmondmorris/node-twitter/pull/69 open pull request
    var errorString = error.toString();
    if (error && !(errorString.indexOf('Error: Status Code: 201') > -1 || errorString.indexOf('Error: Status Code: 202') > -1)) {
      deferred.reject(error);
    }

    return deferred.resolve("Successfully posted to Twitter!");
  });
  return deferred.promise;
};