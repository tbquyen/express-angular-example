/**
 * Required External Modules
 */
import passport from "passport";
import jwt from "passport-jwt";
import { Request } from "express";
import * as dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

/**
 * get cookies from signedCookies.
 */
function fromSignedCookiesWithScheme(req: Request): string | null {
  if (req && req.signedCookies) {
    return req.signedCookies[process.env.JWT_COOKIE];
  }

  return null;
}

/**
 * authenticate using signedCookies.
 */
passport.use(
  "jwt",
  new jwt.Strategy(
    {
      jwtFromRequest: fromSignedCookiesWithScheme,
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload.id).lean().exec().catch();
      if (!user || user.expired) {
        return done(null, false);
      }

      user.password = "";
      return done(null, user);
    }
  )
);

export default passport;
