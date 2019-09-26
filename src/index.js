/**
 * @flow
 */

import { GraphQLServer } from 'graphql-yoga';
import passport from 'passport';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

require('./auth.js');

type Request = {
  request: {
    headers: {
      session: string,
      id: string,
      [key: string]: any,
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,

  context: (req: Request) => {
    const session: string = req.request.headers.session;
    const id: string = req.request.headers.id;
    return {
      session,
      id,
      prisma,
    };
  },
});

server.express.use(cookieParser());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(passport.initialize());
server.express.use(passport.session());

server.express.get('/login', passport.authenticate('github'));
server.express.get(
  '/home',
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:4000/login',
  }),
  function(req, res) {
    let session = req.session.passport.user;
    //send cookie to user browser
    res.cookie(
      'dwoc_user_session',
      JSON.stringify({ session: session.session, id: session.id }),
      { encode: String }
    );
    res.send('Welcome to DWOC');
  }
);

server.express.get('/logout', (req, res, next) => {
  res.redirect('https://github.com/logout');
});

server.start(() => console.log('Server is running on http://localhost:4000'));
