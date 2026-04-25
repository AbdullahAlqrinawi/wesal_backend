import { prisma } from '@/lib/prisma';

export class RolesRepository {
  async findAllRoles() {
    return prisma.role.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async findAllPermissions() {
    return prisma.permission.findMany({
      orderBy: [
        { module: 'asc' },
        { key: 'asc' }
      ]
    });
  }
}