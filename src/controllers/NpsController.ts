import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController {

    /**
     * Detratores => 0 - 6
     * Passivos => 7 - 8 (Não fazem parte do cálculo)
     * Promotores => 9 - 10
     * 
     * ((Nº promotores - Nº detratores) / (nº respondentes)) * 100
     */
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUsers = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = surveyUsers.filter(surveyUser => 
            (surveyUser.value >= 0 && surveyUser.value <= 6)
        ).length;

        const promoters = surveyUsers.filter(surveyUser => 
            (surveyUser.value >= 9 && surveyUser.value <= 10)
        ).length;

        const passive = surveyUsers.filter(surveyUser => 
            (surveyUser.value >= 7 && surveyUser.value <= 8)
        ).length;

        const totalAnswers = surveyUsers.length;
        const calculate = Number(((promoters - detractor) / totalAnswers) * 100).toFixed(2);

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        });
    }
}

export { NpsController };