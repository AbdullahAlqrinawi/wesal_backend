import { InventoryStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export class InventoryRepository {
  async findAllInventory() {
    return prisma.bloodInventory.findMany({
      include: {
        hospital: true
      },
      orderBy: [
        { hospitalId: 'asc' },
        { bloodType: 'asc' }
      ]
    });
  }

  async findInventoryById(id: string) {
    return prisma.bloodInventory.findUnique({
      where: { id },
      include: {
        hospital: true
      }
    });
  }

  async findInventoryByHospitalAndBloodType(hospitalId: string, bloodType: string) {
    return prisma.bloodInventory.findFirst({
      where: {
        hospitalId,
        bloodType: bloodType as never
      }
    });
  }

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async createInventory(data: {
    hospitalId: string;
    bloodType: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
    unitsAvailable: number;
    minimumThreshold: number;
    status: InventoryStatus;
  }) {
    return prisma.bloodInventory.create({
      data,
      include: {
        hospital: true
      }
    });
  }

  async updateInventory(
    id: string,
    data: {
      unitsAvailable?: number;
      minimumThreshold?: number;
      status?: InventoryStatus;
      lastUpdatedAt?: Date;
    }
  ) {
    return prisma.bloodInventory.update({
      where: { id },
      data,
      include: {
        hospital: true
      }
    });
  }

  async createTransaction(data: {
    hospitalId: string;
    bloodType: 'A_POS' | 'A_NEG' | 'B_POS' | 'B_NEG' | 'AB_POS' | 'AB_NEG' | 'O_POS' | 'O_NEG';
    type:
      | 'DONATION_IN'
      | 'REQUEST_OUT'
      | 'ADJUSTMENT'
      | 'EXPIRED_REMOVAL'
      | 'TRANSFER_IN'
      | 'TRANSFER_OUT';
    units: number;
    notes?: string;
  }) {
    return prisma.inventoryTransaction.create({
      data
    });
  }
}