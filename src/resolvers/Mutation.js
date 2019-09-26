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
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.updateUser({
    data: args.data,
    where: args.where,
  });
}

async function createOrganization(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.createOrganization(
    { ...args.data }
  );
}

async function deleteOrganization(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.deleteOrganization({
    ...args.where,
  });
}

async function updateOrganization(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  console.log(authRes);
  if (!authRes.isAuth || authRes.role !== "Admin") {
    throw new Error('login again!');
  }
  return context.prisma.updateOrganization({
    data: args.data,
    where: args.where,
  });
}

module.exports = {
  updateUser,
  updateOrganization,
  deleteOrganization,
  createOrganization
};
