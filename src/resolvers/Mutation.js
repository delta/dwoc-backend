/**
 * @flow
 */

import { authenticate } from "../authentication";
import { GraphQLSchema, GraphQLObjectType, GraphQLBoolean } from "graphql";
import { GraphQLUpload } from "graphql-upload";

const fs = require('fs');
const path = require('path');

type Args = {
  data?: {},
  where?: {},
  [key: any]: any
};

type Context = {
  session: string,
  id: string,
  prisma: {
    [key: string]: any
  }
};

async function updateUser(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return context.prisma.updateUser({
    data: args.data,
    where: args.where
  });
}

/*
Project resolvers
*/
async function createProject(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.createProject({
    ...args.data
  });
}

async function updateProject(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.updateProject({
    data: args.data,
    where: args.where
  });
}

async function deleteProject(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.deleteProject({
    ...args.where
  });
}

/*
Org resolvers
*/
async function createOrganization(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.createOrganization({ ...args.data });
}

async function updateOrganization(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  console.log(authRes);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.updateOrganization({
    data: args.data,
    where: args.where
  });
}

async function deleteOrganization(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.deleteOrganization({
    ...args.where
  });
}

/*
Proposal resolvers
*/
async function createProposal(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return context.prisma.createProposal({
    ...args.data
  });
}

async function updateProposal(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return context.prisma.updateProposal({
    data: args.data,
    where: args.where
  });
}

async function deleteProposal(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return context.prisma.deleteProposal({
    ...args.where
  });
}

/*
Mentor resolvers
*/
async function createMentor(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.createMentor({
    ...args.data
  });
}

async function updateMentor(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.updateMentor({
    data: args.data,
    where: args.where
  });
}

async function deleteMentor(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.deleteMentor({
    ...args.where
  });
}

async function uploadFile(root: any, args: Args, context: Context) {
  //check if user has a valid session
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  const { createReadStream, filename: fileName, mimetype, encoding } = await args.data;
  const stream = createReadStream();
  const {id, filePath} = await storeUpload({stream, fileName, id: context.id});

  return {
    fileName,
    filePath,
  };
}

const storeUpload = async ({ stream, fileName, id }) => {
  let timestamp = Date.now();
  let filePath = path.join(__dirname, '..', '..', '..', 'proposals', `${id + fileName +timestamp}`);
  //create a file for new proposal
  fs.closeSync(fs.openSync(filePath, 'w'));
  //create a writeStream to store incoming stream
  let writeStream = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    stream.pipe(writeStream)
      .on('finish', () => resolve({ id, filePath }))
      .on('error', reject);
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
  uploadFile
};
