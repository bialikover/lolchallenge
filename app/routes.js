// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.all('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // Facebook auth link  =================
    // =====================================
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['read_stream', 'publish_actions']
    }));

    // =====================================
    // Facebook auth link
    // Facebook will redirect the user to this URL after approval.  
    // Finish the authentication process by attempting to obtain an 
    // access token.
    // If access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    // =====================================
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    // =====================================
    // CHALLENGE SECTION ===================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/challenge', isLoggedIn, function(req, res) {
        res.render('step2.ejs', {
            user: req.user // get the user out of session and pass to template
        })
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}