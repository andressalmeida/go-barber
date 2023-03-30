import { startOfHour } from "date-fns";
import { AppDataSource } from "../data-source";
import { Appointments } from "../models/Appointments";
import { findByDate } from "../repositories/AppointmentsRepository";
import AppError from "../errors/AppError";

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request) {
        const appointmentsRepository = AppDataSource.getRepository(Appointments);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await findByDate(appointmentDate);

        if (findAppointmentInSameDate === null) {
            const appointment = appointmentsRepository.create({
                provider_id,
                date: appointmentDate,
            });

            await appointmentsRepository.save(appointment);
            return appointment;
        } else {
            throw new AppError("This appointment is already booked");
        }
    }
}

export default CreateAppointmentService;
