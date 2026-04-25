import { Prisma } from '@prisma/client';
import { AppError } from '@/common/errors/app-error';
import { NotificationsRepository } from './notifications.repository';

type CreateNotificationInput = {
  recipientType: 'USER' | 'DONOR' | 'HOSPITAL';
  userId?: string;
  donorId?: string;
  hospitalId?: string;
  type:
    | 'EMERGENCY'
    | 'CAMPAIGN'
    | 'REMINDER'
    | 'SYSTEM'
    | 'ACHIEVEMENT'
    | 'APPROVAL'
    | 'APPOINTMENT';
  title: string;
  body: string;
  data?: Prisma.InputJsonValue;
  channel?: 'IN_APP' | 'PUSH' | 'SMS' | 'EMAIL';
};

export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  async getNotifications() {
    return this.notificationsRepository.findAllNotifications();
  }

  async getNotificationById(id: string) {
    const notification = await this.notificationsRepository.findNotificationById(id);

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    return notification;
  }

  async createNotification(input: CreateNotificationInput) {
    if (input.recipientType === 'USER') {
      const user = await this.notificationsRepository.findUserById(
        input.userId as string
      );

      if (!user) {
        throw new AppError('User not found', 404);
      }
    }

    if (input.recipientType === 'DONOR') {
      const donor = await this.notificationsRepository.findDonorById(
        input.donorId as string
      );

      if (!donor) {
        throw new AppError('Donor not found', 404);
      }
    }

    if (input.recipientType === 'HOSPITAL') {
      const hospital = await this.notificationsRepository.findHospitalById(
        input.hospitalId as string
      );

      if (!hospital) {
        throw new AppError('Hospital not found', 404);
      }
    }

    return this.notificationsRepository.createNotification({
      recipientType: input.recipientType,
      userId: input.userId,
      donorId: input.donorId,
      hospitalId: input.hospitalId,
      type: input.type,
      title: input.title,
      body: input.body,
      data: input.data,
      channel: input.channel ?? 'IN_APP'
    });
  }

  async markAsRead(id: string) {
    const existingNotification =
      await this.notificationsRepository.findNotificationById(id);

    if (!existingNotification) {
      throw new AppError('Notification not found', 404);
    }

    return this.notificationsRepository.updateNotification(id, {
      isRead: true,
      readAt: new Date()
    });
  }
}