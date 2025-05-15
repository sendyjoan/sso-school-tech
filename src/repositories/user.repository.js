import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = (data) => prisma.user.create({ data });
const findUserByUsername = (username) =>
    prisma.user.findUnique({ where: { username } });
const findUserById = (id) => prisma.user.findUnique({ where: { id } });

export default {
    createUser,
    findUserByUsername,
    findUserById,
};