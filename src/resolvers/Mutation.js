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
/*
Project resolvers
*/
async function createProject(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.createProject({
    ...args.data,
  });
}

async function updateProject(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.updateProject({
    data: args.data,
    where: args.where,
  });
}

async function deleteProject(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Admin") {
    throw new Error('You do not have access!');
  }
  return context.prisma.deleteProject({
    ...args.where,
  });
}
/*
Org resolvers
*/
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
/*
Proposal resolvers
*/
async function createProposal(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.createProposal({
    ...args.data,
  });
}

async function updateProposal(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.updateProposal({
    data: args.data,
    where: args.where,
  });
}

async function deleteProposal(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.deleteProposal({
    where: args.where,
  });
}
/*
Mentor resolvers
*/
async function createMentor(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.createMentor({
    ...args.data,
  });
}

async function updateMentor(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error('Cannot change!');
  }
  return context.prisma.updateMentor({
    data: args.data,
    where: args.where,
  });
}

async function deleteMentor(root, args, context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  return context.prisma.deleteMentor({
    ...args.where,
  });
}
module.exports = {
  updateUser,
  updateProject,
  deleteProject,
  createProject,
  updateOrganization,
  deleteOrganization,
  createOrganization,
  createProposal,
  updateProposal,
  deleteProposal,
  updateMentor,
  createMentor,
  deleteMentor,
};
