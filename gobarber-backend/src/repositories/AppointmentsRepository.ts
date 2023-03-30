import { Appointments } from "../models/Appointments";
import { AppDataSource } from "../data-source";

const AppointmentsRepository = AppDataSource.getRepository(Appointments);

const findByDate = async (date: Date) => {
    const findAppointment = await AppointmentsRepository.findOne({
        where: { date: date },
    });

    return findAppointment;
};

export { findByDate };
