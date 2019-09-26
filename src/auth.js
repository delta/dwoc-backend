/**
 * @flow
 */

import passport from 'passport';
import GitHubStrategy from 'passport-github';
import { prisma } from './generated/prisma-client';

type User = {
  profile: {
    name: string,
    login: string,
    email: string,
    [key: string]: any,
  },
  accessToken: string,
};

passport.use(
  new GitHubStrategy(
    {
      clientID: '0a73f6b3c7a2a72eb0c2',
      clientSecret: '8ecf6ade70c3768635f21ef6df9a1170b5d28934',
      callbackURL: 'http://localhost:4000/home',
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
    where: { githubHandle: user.profile.login },
  });

  if (findUser.length == 0 || findUser == null || findUser == undefined) {
    const name = user.profile.name.split(' ');
    const firstName = name[0];
    const lastName = name.length > 1 ? name[name.length - 1] : ' ';
    let newUser = await prisma.createUser({
      firstName: firstName,
      lastName: lastName,
      email: user.profile.email,
      githubHandle: user.profile.login,
      session: user.accessToken,
    });
    // console.log('NewUser Created successfullt', newUser);
    cb(null, newUser);
  } else {
    //if user already exist then update the access token
    let updatedUser = await prisma.updateUser({
      data: { session: user.accessToken },
      where: { githubHandle: user.profile.login },
    });
    // console.log('Session update successfully', updatedUser);
    cb(null, updatedUser);
  }
});

passport.deserializeUser(function (user, cb) {
  cb(null, user.profile);
});
