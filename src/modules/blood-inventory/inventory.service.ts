import { InventoryStatus } from '@prisma/client';
import { AppError } from '@/common/errors/app-error';
import { InventoryRepository } from './inventory.repository';

type BloodType =
  | 'A_POS'
  | 'A_NEG'
  | 'B_POS'
  | 'B_NEG'
  | 'AB_POS'
  | 'AB_NEG'
  | 'O_POS'
  | 'O_NEG';

type CreateInventoryInput = {
  hospitalId: string;
  bloodType: BloodType;
  unitsAvailable: number;
  minimumThreshold: number;
};

type UpdateInventoryInput = {
  unitsAvailable?: number;
  minimumThreshold?: number;
};

type AdjustInventoryInput = {
  units: number;
  type:
    | 'DONATION_IN'
    | 'REQUEST_OUT'
    | 'ADJUSTMENT'
    | 'EXPIRED_REMOVAL'
    | 'TRANSFER_IN'
    | 'TRANSFER_OUT';
  notes?: string;
};

function calculateInventoryStatus(
  unitsAvailable: number,
  minimumThreshold: number
): InventoryStatus {
  if (unitsAvailable <= 0) {
    return 'CRITICAL';
  }

  if (unitsAvailable < minimumThreshold) {
    return 'LOW';
  }

  return 'SUFFICIENT';
}

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getAllInventory() {
    return this.inventoryRepository.findAllInventory();
  }

  async getInventoryById(id: string) {
    const inventory = await this.inventoryRepository.findInventoryById(id);

    if (!inventory) {
      throw new AppError('Inventory record not found', 404);
    }

    return inventory;
  }

  async createInventory(input: CreateInventoryInput) {
    const hospital = await this.inventoryRepository.findHospitalById(input.hospitalId);

    if (!hospital) {
      throw new AppError('Hospital not found', 404);
    }

    const existingInventory =
      await this.inventoryRepository.findInventoryByHospitalAndBloodType(
        input.hospitalId,
        input.bloodType
      );

    if (existingInventory) {
      throw new AppError('Inventory record already exists for this blood type', 409);
    }

    const status = calculateInventoryStatus(
      input.unitsAvailable,
      input.minimumThreshold
    );

    return this.inventoryRepository.createInventory({
      ...input,
      status
    });
  }

  async updateInventory(id: string, input: UpdateInventoryInput) {
    const existingInventory = await this.inventoryRepository.findInventoryById(id);

    if (!existingInventory) {
      throw new AppError('Inventory record not found', 404);
    }

    const unitsAvailable = input.unitsAvailable ?? existingInventory.unitsAvailable;
    const minimumThreshold =
      input.minimumThreshold ?? existingInventory.minimumThreshold;

    const status = calculateInventoryStatus(unitsAvailable, minimumThreshold);

    return this.inventoryRepository.updateInventory(id, {
      ...input,
      status,
      lastUpdatedAt: new Date()
    });
  }

  async adjustInventory(id: string, input: AdjustInventoryInput) {
    const existingInventory = await this.inventoryRepository.findInventoryById(id);

    if (!existingInventory) {
      throw new AppError('Inventory record not found', 404);
    }

    const updatedUnits = existingInventory.unitsAvailable + input.units;

    if (updatedUnits < 0) {
      throw new AppError('Inventory units cannot be negative', 400);
    }

    const status = calculateInventoryStatus(
      updatedUnits,
      existingInventory.minimumThreshold
    );

    const updatedInventory = await this.inventoryRepository.updateInventory(id, {
      unitsAvailable: updatedUnits,
      status,
      lastUpdatedAt: new Date()
    });

    await this.inventoryRepository.createTransaction({
      hospitalId: existingInventory.hospitalId,
      bloodType: existingInventory.bloodType,
      type: input.type,
      units: input.units,
      notes: input.notes
    });

    return updatedInventory;
  }
}