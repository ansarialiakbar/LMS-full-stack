import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js"
import cloudinary from 'cloudinary';
import fs from 'fs/promises'
import path from 'path';
// import cloudinary from 'cloudinary'


// import {v2 as cloudinary} from 'cloudinary'


const getAllCourses = async(req, res, next)=>{
    // get all courses
  try {
    const courses = await Course.find({}).select('-lectures')

    res.status(200).json({
        success:true,
        message:'All courses',
        courses,
    })

  } catch (e) {
    return res.status(500).json({
        success:false,
        message: e.message
    })
  }
}
const getLectureByCourseId = async(req, res)=>{
  try {
    const {id} = req.params
    console.log('course id>', id);
    const course = await Course.findById(id)
    console.log('course deatil', course);
    if(!course){
      return res.status(400).json({
        success:false,
        message:'Invalid course id'
       })
    }
    res.status(200).json({
      success:true,
      message:'Course lecture succesfully fetched',
      lectures:course.lectures,
    })
  } catch (e) {
   return res.status(500).json({
    success:false,
    message:e.message
   })
  }

}
const createCourse= async (req, res, next)=>{
     const {title, description, category, createdBy} = req.body
     if(!title || !description || !category || !createdBy){
      return next(new AppError('All fields are required', 400))
     }
     const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail:{
        public_id:'Dummy',
        secure_url:'Dummy',
      }
     })
     if(!course){
      return next(new AppError('Course could not created please try again', 500))
     }

     if(req.file){
     try {
      const result = await cloudinary.v2.uploader.upload(req.file.path ,{
        folder: 'lms',
      })
      console.log(JSON.stringify(result));
      if(result){
        course.thumbnail.public_id = result.public_id
        course.thumbnail.secure_url = result.secure_url
      }
      // Removing uploaded file
      await fs.rm(`uploads/${req.file.filename}`)
     } catch (e) {
      return next(new AppError(e.message, 500))
     }
     }

     await course.save()
     res.status(200).json({
      success:true,
      message:'course created successfully',
      course,
     })
}

const updateCourse = async(req, res, next)=>{
  try {
     // Extracting the course id from the request params
     const { id} = req.params
     // Finding the course using the course id
     const course = await Course.findByIdAndUpdate(
      id,{
        $set : req.body // This will only update the fields which are present
      },
      {
        runValidators: true, // This will run the validation checks on the new data
      }
     )
       // If no course found then send the response for the same
     if(!course){
      return next(new AppError('course with given id does not exist', 500))
     }
     res.status(200).json({
      succes:true,
      message:"Course updated successfully",
      course
     })
  } catch (e) {
    return next(new AppError(e.message, 500))
  }
}

const removeLectureFromCourse = async(req, res, next)=>{
    // try {
    //   const { id} = req.params
    //   const course = await Course.findById(id)

    //   if(!course){
    //     return next(new AppError('course with given id does not exist', 500))
    //    }
    //    await Course.findByIdAndDelete(id)
    //    res.status(200).json({
    //     succes:true,
    //     message:"Course deleted successfully",
       
    //    })

    // } catch (e) {
    //   return next(new AppError('course with given id does not exist', 500))
    // }
     // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);
  console.log("course", course);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
}
const addLectureToCourseById = async(req, res, next)=>{
  //  const {title, description} = req.body
  //  const {id} = req.params
  //  if(!title || !description ){
  //   return next(new AppError('All fields are required', 400))
  //  }

  //  const course = await Course.findById(id)
   
  //  if(!course){
  //   return next(new AppError('course with given id does not exist', 500))
  //  }

  //  const lectureData = {
  //   title,
  //   description,
  //   lecture: {}
  //  }

  //  if(req.file){
  //   try {
  //    const result = await cloudinary.v2.uploader.upload(req.file.path ,{
  //      folder: 'lms',
  //    })
  //    console.log(JSON.stringify(result));
  //    if(result){
  //     lectureData.lecture.public_id = result.public_id
  //     lectureData.lecture.secure_url = result.secure_url
  //    }
  //    // Removing uploaded file
  //    fs.rm(`uploads/${req.file.filename}`)
  //   } catch (e) {
  //    return next(new AppError(e.message, 500))
  //   }
  //   }

  //   course.lectures.push(lectureData)
  //   course.numberOfLectures = course.lectures.length

  //   await course.save()

  //   res.status(200).json({
  //     success:true,
  //     message:'Lectures successfully added to your course',
  //     course,
  //   })

  const { title, description } = req.body;
  const { id } = req.params;
  
  

  

  let lectureData = {};

  if (!title || !description) {
    return next(new AppError('Title and Description are required', 400));
  }
  console.log("title", title);
  console.log("description", description);
  
  

  const course = await Course.findById(id);
  console.log("course id", course);
  

  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: 'video',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      await fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      for (const file of await fs.readdir('uploads/')) {
        await fs.unlink(path.join('uploads/', file));
      }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || 'File not uploaded, please try again',
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  res.status(200).json({
    success: true,
    message: 'Course lecture added successfully',
    course,
  });

  }

  /**
 * @DELETE_COURSE_BY_ID
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
 const deleteCourseById = async (req, res, next) => {
  // Extracting id from the request parameters
  const { id } = req.params;

  // Finding the course via the course ID
  const course = await Course.findById(id);

  // If course not find send the message as stated below
  if (!course) {
    return next(new AppError('Course with given id does not exist.', 404));
  }

  // Remove course
  await course.deleteOne();

  // Send the message as response
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
}

export{
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeLectureFromCourse,
    addLectureToCourseById,
    deleteCourseById

}