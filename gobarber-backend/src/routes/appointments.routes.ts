import { Router } from "express";
import { AppDataSource } from "../data-source";
import { parseISO } from "date-fns";
import CreateAppointmentService from "../services/CreateAppointmentService";
import { Appointments } from "../models/Appointments";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get("/", async (request, response) => {
    const appointmentsRepository = AppDataSource.getRepository(Appointments);

    const allAppointments = await appointmentsRepository.find();

    return response.json(allAppointments);
});

appointmentsRouter.post("/", async (request, response) => {

        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();
        const appointment = await createAppointmentService.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
});

export default appointmentsRouter;
