/**
 * @flow
 */

type Args = {
  data?: {},
  where?: {},
  [key: any]: any,
};

type Context = {
  session: string,
  id: string,
  prisma: {
    [key: string]: any,
  },
};

async function organization(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .organization();
}

async function user(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .user();
}

async function file(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .file();
}

async function mentor(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .mentor();
}

module.exports = {
  organization,
  user,
  file,
  mentor
};
