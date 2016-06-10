var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var TumblrStrategy = require('passport-tumblr').Strategy;
var PinterestStrategy = require('passport-pinterest').Strategy;
var WordpressStrategy = require('passport-wordpress').Strategy;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    //FACEBOOK
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },
    // facebook will send back the token and profile
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            var newUser = {};
            newUser.accessToken = accessToken;
            console.log("Facebook Profile: "+JSON.stringify(profile));
            done(null, newUser);
        });

    }));
    
    //LINKEDIN
    passport.use(new LinkedInStrategy({
        clientID:     configAuth.linkedInAuth.clientID,
        clientSecret: configAuth.linkedInAuth.clientSecret,
        callbackURL:  configAuth.linkedInAuth.callbackURL,
        scope:        [ 'r_basicprofile', 'w_share','rw_company_admin'],
        state: true
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          var newUser = {};
          newUser.accessToken = accessToken;
          console.log('refreshToken : '+refreshToken)
          console.log("LinkedIn Profile: "+JSON.stringify(profile));
          return done(null, newUser);
        });
      }
    ));
    
    //TUMBLR
    passport.use(new TumblrStrategy({
        consumerKey: configAuth.tumblrAuth.clientID,
        consumerSecret: configAuth.tumblrAuth.clientSecret,
        callbackURL: configAuth.tumblrAuth.callbackURL
      },
      function(accessToken, tokenSecret, profile, done) {
        process.nextTick(function () {
          var newUser = {};
          newUser.accessToken = accessToken;
          console.log('token secret :'+tokenSecret)
          console.log("Tumblr Profile: "+JSON.stringify(profile));
          return done(null, newUser);
        });
      }
    ));
    
    //PINTEREST
    passport.use(new PinterestStrategy({
            clientID: configAuth.pinterestAuth.clientID,
            clientSecret: configAuth.pinterestAuth.clientSecret,
            scope: ['read_public', 'read_relationships', 'write_public', 'write_relationships'],
            callbackURL: configAuth.pinterestAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
              var newUser = {};
              newUser.accessToken = accessToken;
              console.log('refreshToken :'+refreshToken)
              console.log("Pinterest Profile: "+JSON.stringify(profile));
              return done(null, newUser);
            });
        }
    ));
    
    //WORDPRESS
    passport.use(new WordpressStrategy({
      clientID: configAuth.wordpressAuth.clientID,
      clientSecret: configAuth.wordpressAuth.clientSecret,
      callbackURL: configAuth.wordpressAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        var newUser = {};
        newUser.accessToken = accessToken;
        console.log('refreshToken :'+refreshToken)
        console.log("Wordpress Profile: "+JSON.stringify(profile));
        return done(null, newUser);
      });
    }
  ));

};
