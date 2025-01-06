import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLectureByCourseId, removeLectureFromCourse, updateCourse, deleteCourseById } from "../controllers/course.controller.js";
import { isLoggedIn, authorizedRoles, authorizeSubscriber } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

// creating instance of router
const router = Router()

router.route('/')
     .get(getAllCourses)
     .post(
          isLoggedIn,
          authorizedRoles('ADMIN'),
         upload.single("thumbnail"),
         createCourse
          )
          .delete(isLoggedIn, authorizedRoles('ADMIN'), removeLectureFromCourse);
   
router.route('/:id')
   .get(isLoggedIn,  authorizeSubscriber, getLectureByCourseId)
   .put(isLoggedIn, 
      authorizedRoles('ADMIN'),
      updateCourse)
   .delete(isLoggedIn,
      authorizedRoles('ADMIN'),
      deleteCourseById)
          .post(isLoggedIn,
            authorizedRoles('ADMIN'),
            upload.single('lecture'),
            addLectureToCourseById)
export default router
