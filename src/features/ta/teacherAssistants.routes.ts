import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import CreateTeacherAssistantValidatorMiddleware from "./logic/middlewares/createTeacherAssistantValidator.middleware";
import createTeacherAssistantHandler from "./logic/handlers/createTeacherAssistant.handler";
import ensureTeacherAssitantIdInParamsMiddleware from "./logic/middlewares/ensureTeacherAssistantIdInParams.middleware";
import deleteTeacherAssistantHandler from "./logic/handlers/deleteTeacherAssistant.handler";
import readTeacherAssistantsHandler from "./logic/handlers/readTeacherAssistants.handler";
import updateTeacherAssistantHandler from "./logic/handlers/updateTeacherAssistant.handler";
import findTeacherAssistantById from "./logic/handlers/FindTeacherAssistantById.handler";
import updateTeacherAssistantValidator from "./logic/middlewares/updateTeacherAssistantValidator.middleware";


export default (router: Router) => {
  /*
   * Create Teacher Assistant
   **/
  router.post(
    "/create",

    // Validate request body
    CreateTeacherAssistantValidatorMiddleware,

    asyncHandler(createTeacherAssistantHandler)
  );
  
  /*
   * Delete Teacher Assistant
   **/

  router.delete(
    "/delete/:teacherAssistantId",

    // Ensure Teacher Assistant id in params.
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(deleteTeacherAssistantHandler)
  );
  /*
   * Read paginated instructors
   **/
  router.get(
    "/read",

    // Validate request query params for pagination
    paginationQueryParamsMiddleware,

    asyncHandler(readTeacherAssistantsHandler)
  );

  /*
   * Update Teacher Assistant
   **/
  router.patch(
    "/update/:instructorId",

    // Ensure Teacher Assistant id in params
    ensureTeacherAssitantIdInParamsMiddleware,

    // Validate request body
    updateTeacherAssistantValidator,

    asyncHandler(updateTeacherAssistantHandler)
  );

  /*
    * Find Teacher Assistant by id
    **/
  router.get(
    "/find/:instructorId",

    // Ensure Teacher Assistant id in params
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(findTeacherAssistantById)
  );

};
