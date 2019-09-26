/**
 * @flow
 */

import { authenticate } from '../authentication';

type Args = {
  data?: {},
  where?: {},
  [key: any]: any,
};

type Context = {
  session: string,
  id: string,
  prisma: {
    [key: string]: any
  },
};

async function updateUser(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.updateUser({
    data: args.data,
    where: args.where,
  });
}

module.exports = {
  updateUser,
};
