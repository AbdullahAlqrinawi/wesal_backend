import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { NotificationsService } from './notifications.service';

type NotificationIdParams = {
  id: string;
};

export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) {}

  getNotifications = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.notificationsService.getNotifications();

    return sendSuccess({
      res,
      message: 'Notifications fetched successfully',
      data: result
    });
  };

  getNotificationById = async (
    req: Request<NotificationIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.notificationsService.getNotificationById(
      req.params.id
    );

    return sendSuccess({
      res,
      message: 'Notification fetched successfully',
      data: result
    });
  };

  createNotification = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const result = await this.notificationsService.createNotification(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Notification created successfully',
      data: result
    });
  };

  markAsRead = async (
    req: Request<NotificationIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.notificationsService.markAsRead(req.params.id);

    return sendSuccess({
      res,
      message: 'Notification marked as read successfully',
      data: result
    });
  };
}