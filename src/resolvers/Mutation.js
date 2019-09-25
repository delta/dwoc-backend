import { authenticate } from '../authentication';

async function updateUser(root, args, context) {
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
