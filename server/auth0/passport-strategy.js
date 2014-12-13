var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'holidayjs-wish-list.auth0.com',
    clientID:     'rWkTAoi309hAeOJVcMdCfy2J18oOVR9M',
    clientSecret: 'yf5nQKgpwPofASTLuxNHLHR9WFK6OtPNsMjE7ztFj4E2bw3bWkTiYw83RiCg7_9a',
    callbackURL:  '/auth0-callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
