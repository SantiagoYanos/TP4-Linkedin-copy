import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//Acceso al user desde prisma

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Funcion de crear usuario en la bd
import userModel from "../models/User.js";

import { uniqueID } from "../utils/uniqueID.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

//GOOGLE

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      state: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        //console.log(profile);

        const user = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });

        if (user) return cb(null, user);

        console.log("Usuario encontrado");

        const newUser = {
          id: uniqueID(profile.emails[0].value),
          googleId: profile.id,
          name: profile.name.givenName,
          surname: profile.name.familyName,
          avatar: profile._json.picture,
          email: profile.emails[0].value,
        };

        const userCreated = await userModel.createUser(newUser);

        console.log(userCreated);

        return cb(null, userCreated);
      } catch (err) {
        console.log(err);
        cb(err);
      }
    }
  )
);

export default passport;
