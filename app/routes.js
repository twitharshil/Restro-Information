 var path    = require("path"); 

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.post('/login', function(req, res) {
            res.sendFile(path.join('C:/nodeproject/views/login1.html'));
        });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signuppage', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.jade', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.jade', {
            user : req.user // get the user out of session and pass to template
        });
    });


    app.post('/responsed', function(req, res) {

            var jsonString;
            
            var zomato = require('zomato');
            var client = zomato.createClient({
              userKey: '5bf3dab9d38c3baa0dae886d302fc01b', //as obtained from [Zomato API](https://developers.zomato.com/apis)
            });
            
            client.getGeocode({
            lat: req.body['lat'], //latitude
            lon: req.body['lng']
            }, function(err, result){
            if(!err){
                  jsonString = JSON.parse(result)
                  res.send(jsonString);
                //console.log(jsonString.nearby_restaurants[0].restaurant.location.latitude)
                     } 
                  
            else {
              console.log(err);
            }
        });
    });

  app.post('/distance', function(req, res) {

         var distance = require('google-distance-matrix');
        
        var origins = [req.body.origin,req.body.origin1];
        var destinations = [ req.body.destination,req.body.destination1];
         
        distance.key('AIzaSyBw4lIW2qbbNzJ2LTSkDVGYL17IoXWgrsQ');
        distance.units('imperial');
         
        distance.matrix(origins, destinations, function (err, distances) {
              
            if (err) {
                return console.log(err);
            }
            if(!distances) {
                return console.log('no distances');
            }
            if (distances.status == 'OK') {
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        console.log("i am in1 ");
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var distance = distances.rows[i].elements[j].distance.text;
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
        });
 });












    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // app/routes.js


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

 