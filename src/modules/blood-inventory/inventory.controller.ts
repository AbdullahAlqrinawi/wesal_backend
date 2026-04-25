import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { InventoryService } from './inventory.service';

type InventoryIdParams = {
  id: string;
};

export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  getAllInventory = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.inventoryService.getAllInventory();

    return sendSuccess({
      res,
      message: 'Inventory fetched successfully',
      data: result
    });
  };

  getInventoryById = async (
    req: Request<InventoryIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.inventoryService.getInventoryById(req.params.id);

    return sendSuccess({
      res,
      message: 'Inventory record fetched successfully',
      data: result
    });
  };

  createInventory = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.inventoryService.createInventory(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Inventory record created successfully',
      data: result
    });
  };

  updateInventory = async (
    req: Request<InventoryIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.inventoryService.updateInventory(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Inventory record updated successfully',
      data: result
    });
  };

  adjustInventory = async (
    req: Request<InventoryIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.inventoryService.adjustInventory(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Inventory adjusted successfully',
      data: result
    });
  };
}