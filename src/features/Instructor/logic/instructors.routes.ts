import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createInstructorValidatorMiddleware from "./middlewares/createInstructorValidator.middleware";
import createInstructorHandler from "./handlers/createInstructor.handler";
import ensureInstructorIdInParamsMiddleware from "./middlewares/ensureInstructorIdInParams.middleware";
import deleteInstructorHandler from "./handlers/deleteInstructor.handler";
import readInstructorsHandler from "./handlers/readInstructors.handler";
import updateInstructorValidator from "./middlewares/updateInstructorValidator.middleware";
import updateInstructorHandler from "./handlers/updateInstructor.handler";
import findInstructorById from "./handlers/FindInstructorById.handler";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import paginate from "express-paginate";
import readInstructorsValidator from "./middlewares/readInstructorsValidator.middleware";
import findAuthenticatedInstructorHandler from "./handlers/me.handler";

const instructorsRoutes = (router: Router) => {
  /*
   * Create Instructor
   **/
  router.post(
    "/create",

    // Validate request body
    // checkRole([Role.EMPLOYEE, Role.ADMIN]),
    createInstructorValidatorMiddleware,

    asyncHandler(createInstructorHandler)
  );

  /*
   * Delete Instructor
   **/

  router.delete(
    "/delete/:instructorId",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure Instructor id in params.
    ensureInstructorIdInParamsMiddleware,

    asyncHandler(deleteInstructorHandler)
  );
  /*
   * Read paginated instructors
   **/
  router.get(
    "/read",

    // checkRole([Role.STUDENT, Role.EMPLOYEE, Role.ADMIN]),

    // Validate request query params for pagination
    paginate.middleware(),

    readInstructorsValidator,

    asyncHandler(readInstructorsHandler)
  );

  /*
   * Get authenticated instructor
   **/
  router.get(
    "/me",

    checkRole([Role.INSTRUCTOR]),

    asyncHandler(findAuthenticatedInstructorHandler)
  );

  /*
   * Update instructor
   **/
  router.patch(
    "/update/:instructorId",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure instructor id in params
    ensureInstructorIdInParamsMiddleware,

    // Validate request body
    updateInstructorValidator,

    asyncHandler(updateInstructorHandler)
  );

  /*
   * Find instructor by id
   **/
  router.get(
    "/find/:instructorId",

    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    // Ensure instructor id in params
    ensureInstructorIdInParamsMiddleware,

    asyncHandler(findInstructorById)
  );
};

export default instructorsRoutes;
