/**
 * @flow
 */

import { GraphQLServer } from 'graphql-yoga';
import passport from 'passport';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';

require('./auth.js');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

server.express.use(passport.initialize());
server.express.use(passport.session());

server.express.get('/login', passport.authenticate('github'));
server.express.get(
  '/home',
  passport.authenticate('github', { failureRedirect: null }),
  function(req, res) {
    res.send('Welcome to DWOC');
  }
);

server.express.get('/logout', (req, res, next) => {
  res.redirect('https://github.com/logout');
});

server.start(() => console.log('Server is running on http://localhost:4000'));
