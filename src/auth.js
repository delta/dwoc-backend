/**
 * @flow
 */

import passport from "passport";
import GitHubStrategy from "passport-github";
import { prisma } from "./generated/prisma-client";

type User = {
  profile: {
    name: string,
    login: string,
    email: string,
    [key: string]: any
  },
  accessToken: string
};

passport.use(
  new GitHubStrategy(
    {
      clientID: "35b62bd93dc7d22fce6b",
      clientSecret: "fdb254cb1c7a3b9e6c90eb2b5b7733c3ec997bdb",
      callbackURL: "https://delta.nitt.edu/dwocb/home"
    },
    function(
      accessToken: string,
      refreshToken: string,
      profile: { _json: {}, _raw: {} },
      cb
    ) {
      return cb(null, { profile: profile._json, accessToken: accessToken });
    }
  )
);

passport.serializeUser(async (user: User, cb: (a?: any, b?: any) => any) => {
  //create a new user if user does not exist
  let findUser = await prisma.users({
    where: { githubHandle: user.profile.login }
  });

  if (findUser.length == 0 || findUser == null || findUser == undefined) {
    const name = user.profile.name.split(" ");
    const firstName = name[0];
    const lastName = name.length > 1 ? name[name.length - 1] : " ";
    
    let newUser = await prisma.createUser({
      firstName: firstName,
      lastName: lastName,
      email: user.profile.email,
      githubHandle: user.profile.login,
      session: user.accessToken,
      profileImage: user.profile.avatar_url
    });
    // console.log('NewUser Created successfullt', newUser);
    cb(null, newUser);
  } else {
    //if user already exist then update the access token
    let updatedUser = await prisma.updateUser({
      data: { session: user.accessToken },
      where: { githubHandle: user.profile.login }
    });
    // console.log('Session update successfully', updatedUser);
    cb(null, updatedUser);
  }
});

passport.deserializeUser(function(user, cb) {
  cb(null, user.profile);
});
