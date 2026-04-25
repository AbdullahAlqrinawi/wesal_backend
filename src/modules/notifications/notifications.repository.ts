import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export class NotificationsRepository {
  async findAllNotifications() {
    return prisma.notification.findMany({
      include: {
        user: true,
        donor: true,
        hospital: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findNotificationById(id: string) {
    return prisma.notification.findUnique({
      where: { id },
      include: {
        user: true,
        donor: true,
        hospital: true
      }
    });
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async findDonorById(donorId: string) {
    return prisma.donor.findUnique({
      where: { id: donorId }
    });
  }

  async findHospitalById(hospitalId: string) {
    return prisma.hospital.findUnique({
      where: { id: hospitalId }
    });
  }

  async createNotification(data: {
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
  }) {
    return prisma.notification.create({
      data,
      include: {
        user: true,
        donor: true,
        hospital: true
      }
    });
  }

  async updateNotification(
    id: string,
    data: {
      isRead?: boolean;
      readAt?: Date | null;
    }
  ) {
    return prisma.notification.update({
      where: { id },
      data,
      include: {
        user: true,
        donor: true,
        hospital: true
      }
    });
  }
}