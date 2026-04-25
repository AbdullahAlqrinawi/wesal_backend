import { Request, Response } from 'express';
import { sendSuccess } from '@/common/utils/api-response';
import { AppointmentsService } from './appointments.service';

type AppointmentIdParams = {
  id: string;
};

export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  getAppointments = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.appointmentsService.getAppointments();

    return sendSuccess({
      res,
      message: 'Appointments fetched successfully',
      data: result
    });
  };

  getAppointmentById = async (
    req: Request<AppointmentIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.appointmentsService.getAppointmentById(req.params.id);

    return sendSuccess({
      res,
      message: 'Appointment fetched successfully',
      data: result
    });
  };

  createAppointment = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.appointmentsService.createAppointment(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'Appointment created successfully',
      data: result
    });
  };

  updateAppointment = async (
    req: Request<AppointmentIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.appointmentsService.updateAppointment(req.params.id, req.body);

    return sendSuccess({
      res,
      message: 'Appointment updated successfully',
      data: result
    });
  };

  cancelAppointment = async (
    req: Request<AppointmentIdParams>,
    res: Response
  ): Promise<Response> => {
    const result = await this.appointmentsService.cancelAppointment(req.params.id);

    return sendSuccess({
      res,
      message: 'Appointment cancelled successfully',
      data: result
    });
  };
}