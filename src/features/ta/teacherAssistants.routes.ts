import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import createTeacherAssistantValidatorMiddleware from "./logic/middlewares/createTeacherAssistantValidator.middleware";
import createTeacherAssistantHandler from "./logic/handlers/createTeacherAssistant.handler";
import ensureTeacherAssitantIdInParamsMiddleware from "./logic/middlewares/ensureTeacherAssistantIdInParams.middleware";
import deleteTeacherAssistantHandler from "./logic/handlers/deleteTeacherAssistant.handler";
import readTeacherAssistantsHandler from "./logic/handlers/readTeacherAssistants.handler";
import updateTeacherAssistantHandler from "./logic/handlers/updateTeacherAssistant.handler";
import findTeachingAssistantByIdHandler from "./logic/handlers/FindTeacherAssistantById.handler";
import updateTeacherAssistantValidator from "./logic/middlewares/updateTeacherAssistantValidator.middleware";
import readTeacherAsssistantsValidator from "./logic/middlewares/readTeacherAssistantsValidator.middleware";
import paginate from "express-paginate";
import findAuthenticatedTaHandler from "./logic/handlers/me.handler";

const teacherAssistantsRoutes = (router: Router) => {
  /*
   * Get authenticated TA
   **/
  router.get(
    "/me",
    checkRole([Role.TEACHING_ASSISTANT]),

    asyncHandler(findAuthenticatedTaHandler)
  );

  /*
   * Create Teacher Assistant
   **/
  router.post(
    "/",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Validate request body
    createTeacherAssistantValidatorMiddleware,

    asyncHandler(createTeacherAssistantHandler)
  );

  /*
   * Delete Teacher Assistant
   **/

  router.delete(
    "/:teachingAssistantId",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure Teacher Assistant id in params.
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(deleteTeacherAssistantHandler)
  );
  /*
   * Read paginated instructors
   **/
  router.get(
    "/",
    checkRole([
      Role.EMPLOYEE,
      Role.ADMIN,
      Role.STUDENT,
      Role.INSTRUCTOR,
      Role.TEACHING_ASSISTANT,
    ]),
    // Validate request query params for pagination
    paginate.middleware(),
    readTeacherAsssistantsValidator,
    asyncHandler(readTeacherAssistantsHandler)
  );

  /*
   * Update Teacher Assistant
   **/
  router.patch(
    "/:teachingAssistantId",
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
    "/:teachingAssistantId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure Teacher Assistant id in params
    ensureTeacherAssitantIdInParamsMiddleware,

    asyncHandler(findTeachingAssistantByIdHandler)
  );
};

export default teacherAssistantsRoutes;
