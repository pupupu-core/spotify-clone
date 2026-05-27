import type { User as PrismaUser } from '../../../../../generated/prisma/client';

export type User = Pick<PrismaUser, 'id' | 'email' | 'createdAt' | 'updatedAt' | 'password'>;
export type AuthUser = Pick<PrismaUser, 'id' | 'email' | 'password'>;
