function createNewUser(root, args, context) {
  return context.prisma.createUser({
    ...args.data,
  });
}

module.exports = {
  createNewUser,
};
