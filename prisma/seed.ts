import { PrismaClient, AccountScope } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roles = [
  {
    name: 'SUPER_ADMIN',
    scope: AccountScope.SYSTEM,
    description: 'Full system access'
  },
  {
    name: 'MOH_ADMIN',
    scope: AccountScope.MOH,
    description: 'Jordan Ministry of Health administrator'
  },
  {
    name: 'MOH_MANAGER',
    scope: AccountScope.MOH,
    description: 'Jordan Ministry of Health manager'
  },
  {
    name: 'REGION_MANAGER',
    scope: AccountScope.MOH,
    description: 'Regional health manager'
  },
  {
    name: 'APPROVAL_OFFICER',
    scope: AccountScope.MOH,
    description: 'Approvals officer'
  },
  {
    name: 'ANALYTICS_OFFICER',
    scope: AccountScope.MOH,
    description: 'Analytics officer'
  },
  {
    name: 'HOSPITAL_ADMIN',
    scope: AccountScope.HOSPITAL,
    description: 'Hospital administrator'
  },
  {
    name: 'BLOOD_BANK_MANAGER',
    scope: AccountScope.HOSPITAL,
    description: 'Blood bank manager'
  },
  {
    name: 'INVENTORY_OFFICER',
    scope: AccountScope.HOSPITAL,
    description: 'Inventory officer'
  },
  {
    name: 'REQUEST_OFFICER',
    scope: AccountScope.HOSPITAL,
    description: 'Blood request officer'
  },
  {
    name: 'CAMPAIGN_MANAGER',
    scope: AccountScope.HOSPITAL,
    description: 'Campaign manager'
  },
  {
    name: 'HOSPITAL_STAFF',
    scope: AccountScope.HOSPITAL,
    description: 'General hospital staff'
  }
];

const permissions = [
  { key: 'users.read', module: 'users', description: 'Read users' },
  { key: 'users.create', module: 'users', description: 'Create users' },
  { key: 'users.update', module: 'users', description: 'Update users' },
  { key: 'users.activate', module: 'users', description: 'Activate users' },
  { key: 'users.deactivate', module: 'users', description: 'Deactivate users' },

  { key: 'roles.read', module: 'roles', description: 'Read roles' },

  { key: 'hospitals.read', module: 'hospitals', description: 'Read hospitals' },
  { key: 'hospitals.create', module: 'hospitals', description: 'Create hospitals' },
  { key: 'hospitals.update', module: 'hospitals', description: 'Update hospitals' },
  { key: 'hospitals.approve', module: 'hospitals', description: 'Approve hospitals' },

  { key: 'donors.read', module: 'donors', description: 'Read donors' },
  { key: 'donors.update', module: 'donors', description: 'Update donors' },
  { key: 'donors.verify', module: 'donors', description: 'Verify donors' },

  { key: 'inventory.read', module: 'inventory', description: 'Read inventory' },
  { key: 'inventory.update', module: 'inventory', description: 'Update inventory' },
  { key: 'inventory.adjust', module: 'inventory', description: 'Adjust inventory' },

  { key: 'blood_requests.read', module: 'blood_requests', description: 'Read blood requests' },
  { key: 'blood_requests.create', module: 'blood_requests', description: 'Create blood requests' },
  { key: 'blood_requests.update', module: 'blood_requests', description: 'Update blood requests' },
  { key: 'blood_requests.fulfill', module: 'blood_requests', description: 'Fulfill blood requests' },
  { key: 'blood_requests.match', module: 'blood_requests', description: 'Match donors to requests' },

  { key: 'appointments.read', module: 'appointments', description: 'Read appointments' },
  { key: 'appointments.create', module: 'appointments', description: 'Create appointments' },
  { key: 'appointments.update', module: 'appointments', description: 'Update appointments' },
  { key: 'appointments.cancel', module: 'appointments', description: 'Cancel appointments' },

  { key: 'campaigns.read', module: 'campaigns', description: 'Read campaigns' },
  { key: 'campaigns.create', module: 'campaigns', description: 'Create campaigns' },
  { key: 'campaigns.update', module: 'campaigns', description: 'Update campaigns' },
  { key: 'campaigns.publish', module: 'campaigns', description: 'Publish campaigns' },

  { key: 'approvals.read', module: 'approvals', description: 'Read approvals' },
  { key: 'approvals.review', module: 'approvals', description: 'Review approvals' },

  { key: 'reports.read', module: 'reports', description: 'Read reports' },
  { key: 'reports.generate', module: 'reports', description: 'Generate reports' },
  { key: 'reports.export', module: 'reports', description: 'Export reports' },

  { key: 'analytics.read', module: 'analytics', description: 'Read analytics' },

  { key: 'notifications.read', module: 'notifications', description: 'Read notifications' },
  { key: 'notifications.send', module: 'notifications', description: 'Send notifications' },

  { key: 'settings.read', module: 'settings', description: 'Read settings' },
  { key: 'settings.update', module: 'settings', description: 'Update settings' },

  { key: 'audit_logs.read', module: 'audit_logs', description: 'Read audit logs' }
];

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        scope: role.scope,
        description: role.description
      },
      create: role
    });
  }

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      update: {
        module: permission.module,
        description: permission.description
      },
      create: permission
    });
  }

  const superAdminRole = await prisma.role.findUnique({
    where: { name: 'SUPER_ADMIN' }
  });

  if (!superAdminRole) {
    throw new Error('SUPER_ADMIN role not found');
  }

  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id
        }
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id
      }
    });
  }

  const passwordHash = await bcrypt.hash('Admin@123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@wisal.jo' },
    update: {
      fullName: 'Wisal Jordan Super Admin',
      passwordHash,
      roleId: superAdminRole.id,
      status: 'ACTIVE'
    },
    create: {
      fullName: 'Wisal Jordan Super Admin',
      email: 'admin@wisal.jo',
      passwordHash,
      roleId: superAdminRole.id,
      status: 'ACTIVE'
    }
  });

  console.log('✅ Jordan seed completed successfully');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });