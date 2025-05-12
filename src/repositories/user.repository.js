import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = (data) => prisma.user.create({ data });
const findUserByEmail = (email) =>
    prisma.user.findUnique({ where: { email } });

export default {
    createUser,
    findUserByEmail,
};