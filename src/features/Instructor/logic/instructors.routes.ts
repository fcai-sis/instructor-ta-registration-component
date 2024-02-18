import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import CreateInstructorValidatorMiddleware from "./middlewares/createInstructorValidator.middleware";
import createInstructorHandler from "./handlers/createInstructor.handler";
import ensureInstructorIdInParamsMiddleware from "./middlewares/ensureInstructorIdInParams.middleware";
import deleteInstructorHandler from "./handlers/deleteInstructor.handler";
import readInstructorsHandler from "./handlers/readInstructors.handler";
import updateInstructorValidator from "./middlewares/updateInstructorValidator.middleware";
import updateInstructorHandler from "./handlers/updateInstructor.handler";
import findInstructorById from "./handlers/FindInstructorById.handler";


const instructorsRoutes = (router: Router) => {
  /*
   * Create Instructor
   **/
  router.post(
    "/create",

    // Validate request body
    CreateInstructorValidatorMiddleware,

    asyncHandler(createInstructorHandler)
  );

  /*
   * Delete Instructor
   **/

  router.delete(
    "/delete/:instructorId",

    // Ensure Instructor id in params.
    ensureInstructorIdInParamsMiddleware,

    asyncHandler(deleteInstructorHandler)
  );
  /*
   * Read paginated instructors
   **/
  router.get(
    "/read",

    // Validate request query params for pagination
    paginationQueryParamsMiddleware,

    asyncHandler(readInstructorsHandler)
  );

  /*
   * Update instructor
   **/
  router.patch(
    "/update/:instructorId",

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

    // Ensure instructor id in params
    ensureInstructorIdInParamsMiddleware,

    asyncHandler(findInstructorById)
  );
};

export default instructorsRoutes;