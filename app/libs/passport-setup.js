const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '803959963328-174t6vqsqt0786ihqiidl9d1uaouan1n.apps.googleusercontent.com',
    clientSecret: '_MYQ5MTbEY1Ek2d6G792bL56',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, profile);
        //});
    }
));


