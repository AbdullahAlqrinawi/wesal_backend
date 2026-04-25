import { prisma } from '@/lib/prisma';

export class AppointmentsRepository {
  async findAllAppointments() {
    return prisma.appointment.findMany({
      include: {
        donor: true,
        hospital: true,
        campaign: true
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });
  }

  async findAppointmentById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        donor: true,
        hospital: true,
        campaign: true
      }
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

  async findCampaignById(campaignId: string) {
    return prisma.campaign.findUnique({
      where: { id: campaignId }
    });
  }

  async createAppointment(data: {
    donorId: string;
    hospitalId: string;
    campaignId?: string;
    appointmentDate: Date;
    startTime?: string;
    endTime?: string;
    source: 'DONOR_APP' | 'HOSPITAL_PORTAL' | 'MOH_PORTAL';
    notes?: string;
  }) {
    return prisma.appointment.create({
      data,
      include: {
        donor: true,
        hospital: true,
        campaign: true
      }
    });
  }

  async updateAppointment(
    id: string,
    data: {
      appointmentDate?: Date;
      startTime?: string;
      endTime?: string;
      status?: 'BOOKED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
      notes?: string;
    }
  ) {
    return prisma.appointment.update({
      where: { id },
      data,
      include: {
        donor: true,
        hospital: true,
        campaign: true
      }
    });
  }
}