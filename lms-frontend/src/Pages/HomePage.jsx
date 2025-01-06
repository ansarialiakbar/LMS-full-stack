import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout'
<<<<<<< HEAD
const homePageMainImage = '/Assets/Images/homePageMainImage.png';;

=======
import homePageMainImage from '../Assets/Images/homePageMainImage.png';
>>>>>>> 4b7738b55fc1ab8a47c7731ad40cdab68c9196fd
function HomePage(){
    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
               <div className="w-1/2 space-y-6">
               <h1 className='text-5xl font-semibold'>
                  Find out best 
                  <span className="text-yellow-500 font-bold">
                    Online Courses
                  </span>
               </h1>
               <p className='text-xl text-gray-200'>
                we have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost
               </p>
               <div className="space-x-6">
                <Link to= "/courses">
                <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                    Explore Courses
                </button>
                </Link>

                <Link to= "/contact">
                <button className=' bg-slate-400 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-700 transition-all ease-in-out duration-300'>
                    Contact Us
                </button>
                </Link>
               </div>
               </div>

               <div className='w-1/2 flex items-center justify-center'>
<<<<<<< HEAD
               <img alt='homepage' src={ homePageMainImage} />
=======
               <img alt='homepage' src={homePageMainImage} />
>>>>>>> 4b7738b55fc1ab8a47c7731ad40cdab68c9196fd
           
               </div>
            </div>

        </HomeLayout>

    );

}
export default HomePage;
