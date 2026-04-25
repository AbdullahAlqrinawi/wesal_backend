import { AppError } from '@/common/errors/app-error';
import { AppointmentsRepository } from './appointments.repository';

type CreateAppointmentInput = {
  donorId: string;
  hospitalId: string;
  campaignId?: string;
  appointmentDate: string;
  startTime?: string;
  endTime?: string;
  source: 'DONOR_APP' | 'HOSPITAL_PORTAL' | 'MOH_PORTAL';
  notes?: string;
};

type UpdateAppointmentInput = {
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  status?: 'BOOKED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  notes?: string;
};

export class AppointmentsService {
  constructor(private readonly appointmentsRepository: AppointmentsRepository) {}

  async getAppointments() {
    return this.appointmentsRepository.findAllAppointments();
  }

  async getAppointmentById(id: string) {
    const appointment = await this.appointmentsRepository.findAppointmentById(id);

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    return appointment;
  }

  async createAppointment(input: CreateAppointmentInput) {
    const donor = await this.appointmentsRepository.findDonorById(input.donorId);

    if (!donor) {
      throw new AppError('Donor not found', 404);
    }

    const hospital = await this.appointmentsRepository.findHospitalById(input.hospitalId);

    if (!hospital) {
      throw new AppError('Hospital not found', 404);
    }

    if (input.campaignId) {
      const campaign = await this.appointmentsRepository.findCampaignById(input.campaignId);

      if (!campaign) {
        throw new AppError('Campaign not found', 404);
      }
    }

    return this.appointmentsRepository.createAppointment({
      donorId: input.donorId,
      hospitalId: input.hospitalId,
      campaignId: input.campaignId,
      appointmentDate: new Date(input.appointmentDate),
      startTime: input.startTime,
      endTime: input.endTime,
      source: input.source,
      notes: input.notes
    });
  }

  async updateAppointment(id: string, input: UpdateAppointmentInput) {
    const existingAppointment = await this.appointmentsRepository.findAppointmentById(id);

    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    return this.appointmentsRepository.updateAppointment(id, {
      appointmentDate: input.appointmentDate
        ? new Date(input.appointmentDate)
        : undefined,
      startTime: input.startTime,
      endTime: input.endTime,
      status: input.status,
      notes: input.notes
    });
  }

  async cancelAppointment(id: string) {
    const existingAppointment = await this.appointmentsRepository.findAppointmentById(id);

    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    return this.appointmentsRepository.updateAppointment(id, {
      status: 'CANCELLED'
    });
  }
}