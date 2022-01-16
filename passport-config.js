const User = require("./model/user");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1026398983982-g2k7vim7iejs2f78pu5rmcuffh12itdr.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/google/callback",
    },
    async function (accessToken, refreshToken, profile, next) {
    //   User.findOrCreate({ id: profile.id }, function (err, user) {
    //     return next(err, user);
    //   });
    try {
        const user = await User.findOne({ id: profile.id });
        if (user) {
            return next(null,user);
        }
        const name = profile.displayName;
        const id = profile.id;
        const email = profile.emails[0].value;
        console.log(profile.emails);
        await User.create({
            name,
            id,
            email
        });
        return next(null,user);
    } catch(e) {
        console.log('error happened ',e);
        process.exit(1);
    }
}
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "621575719122646",
      clientSecret: "a99f9ebff70c16b8a5344fc6282f4a1e",
      callbackURL: "http://localhost:4000/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "picture.type(large)",
        "email",
      ],
    },
    async function (accessToken, refreshToken, profile, next) {
      // User.findOrCreate({ id: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log("Hello");
      try {
        const user = await User.findOne({ id: profile.id });
        if (user) {
          return next(null, user);
        }
        const name = profile.displayName;
        const id = profile.id;
        const email = profile.emails[0].value;
        console.log(profile);
        await User.create({
          name,
          id,
          email,
        });
        return next(null, user);
      } catch (e) {
        console.log("error happened ", e);
        process.exit(1);
      }
    }
  )
);

//http://localhost:4000/github/callback
// Github Client ID: f9c6f9dd79cd4a4ee5d6
// Github Client Secrect: 0655a166930d9b0083784550a95791f35b3ec703

passport.use(
  new GitHubStrategy(
    {
      clientID: "f9c6f9dd79cd4a4ee5d6",
      clientSecret: "0655a166930d9b0083784550a95791f35b3ec703",
      callbackURL: "http://localhost:4000/github/callback",
    },
    async function (accessToken, refreshToken, profile, next) {
      try {
        const user = await User.findOne({ id: profile.id });
        if (user) {
          return next(null, user);
        }
        const name = profile.displayName ?profile.displayName:"" ;
        const id = profile.id ?profile.id:"" ;
        const email = profile.email ;
        console.log(profile);
        await User.create({
          name,
          id,
          email,
        });
        return next(null, user);
      } catch (e) {
        console.log("error happened ", e);
        process.exit(1);
      }
    }
  )
);
// I will Add Additional Features later