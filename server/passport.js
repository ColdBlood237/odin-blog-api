const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const Admin = require("./models/admin");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const admin = await Admin.findOne({ username: username });
      if (!admin) {
        return done(null, false, { message: "Incorrect username" });
      }
      await bcrypt.compare(password, admin.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, admin, { message: "Logged In Successfully" });
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     async (jwtPayload, cb) => {
//       try {
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         const admin = await Admin.findById(jwtPayload.sub);
//         if (admin) {
//           return cb(null, admin);
//         }
//       } catch (err) {
//         return cb(err);
//       }
//     }
//   )
// );

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload, done) {
      try {
        const admin = await Admin.findOne({ id: jwt_payload.sub });
        if (admin) {
          return done(null, admin);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
