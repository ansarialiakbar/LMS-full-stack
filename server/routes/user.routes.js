import {Router} from "express"
import {register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser } from '../controllers/user.controller.js'
import {isLoggedIn} from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"
// import bodyParser from "body-parser"
const router = Router()
// router.use(bodyParser.json());
router.post('/register', upload.single("avatar"), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me',  isLoggedIn, getProfile)
router.post('/reset', forgotPassword)
router.post('/reset/:resetId',  resetPassword)
router.post('/change-password', isLoggedIn, changePassword)
router.put('/update/:id', isLoggedIn, upload.single("avatar"), updateUser)
export default router