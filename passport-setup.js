const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserialize');
    done(null, {picture: 'none'});
});

passport.use(new GoogleStrategy({
    clientID: '119704201664-rdqlp8psb2klioa48ov4ndd8gc9b20ij.apps.googleusercontent.com',
    clientSecret: 'wDgDKEF8I2AsIj8dlCid31ru',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, profile);
        //});
    }
));

