import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import createTeacherAssistantValidatorMiddleware from "./logic/middlewares/createTeacherAssistantValidator.middleware";
import createTeacherAssistantHandler from "./logic/handlers/createTeacherAssistant.handler";
import ensureTeacherAssitantIdInParamsMiddleware from "./logic/middlewares/ensureTeacherAssistantIdInParams.middleware";
import deleteTeacherAssistantHandler from "./logic/handlers/deleteTeacherAssistant.handler";
import readTeacherAssistantsHandler from "./logic/handlers/readTeacherAssistants.handler";
import updateTeacherAssistantHandler from "./logic/handlers/updateTeacherAssistant.handler";
import findTeacherAssistantById from "./logic/handlers/FindTeacherAssistantById.handler";
import updateTeacherAssistantValidator from "./logic/middlewares/updateTeacherAssistantValidator.middleware";

const teacherAssistantsRoutes = (router: Router) => {
  /*
   * Create Teacher Assistant
   **/
  router.post(
    "/create",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Validate request body
    createTeacherAssistantValidatorMiddleware,

    asyncHandler(createTeacherAssistantHandler)
  );

  /*
   * Delete Teacher Assistant
   **/

  router.delete(
    "/delete/:teacherAssistantId",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure Teacher Assistant id in params.
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(deleteTeacherAssistantHandler)
  );
  /*
   * Read paginated instructors
   **/
  router.get(
    "/read",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Validate request query params for pagination
    // paginationQueryParamsMiddleware,

    asyncHandler(readTeacherAssistantsHandler)
  );

  /*
   * Update Teacher Assistant
   **/
  router.patch(
    "/update/:teacherAssistantId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
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
    "/find/:teacherAssistantId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure Teacher Assistant id in params
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(findTeacherAssistantById)
  );
};

export default teacherAssistantsRoutes;
