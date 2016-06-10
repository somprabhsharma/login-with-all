module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        const token = req.user.accessToken
        console.log("token : "+token)
        res.render('profile.ejs', {
            token: token
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'publish_actions']}));
    
    app.get('/auth/linkedin', passport.authenticate('linkedin'));
    
    app.get('/auth/tumblr', passport.authenticate('tumblr'),function(req, res){
    });
      
    app.get('/auth/pinterest', passport.authenticate('pinterest'));
    
    app.get('/auth/wordpress', passport.authenticate('wordpress'));
    
    app.get('/auth/wordpress/callback', 
      passport.authenticate('wordpress', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/profile');
      }
    );
    
    app.get('/auth/pinterest/callback', 
        passport.authenticate('pinterest', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/profile');
        }
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );
    
    app.get('/auth/linkedin/callback', 
      passport.authenticate('linkedin', {
          successRedirect: '/profile',
          failureRedirect: '/'
        })
    );
    
    app.get('/auth/tumblr/callback', 
      passport.authenticate('tumblr', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/profile');
      });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
