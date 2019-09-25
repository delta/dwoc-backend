export const mutations={
    createUser:(parent,args,ctx,info)=>{
        return ctx.prisma.createUser({
            firstName,
            lastName,
            githubHandle
        })
    }
}