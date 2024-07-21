import { allUserData, allUsers,  checkAuth,  login, signup, userDetails, userUpdate, verifyOtp } from "../Controllers /userControllers.js";
import  Express  from 'express'
import  {auth} from "../Middleware/Auth.js";

  const router=Express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/verifyotp',verifyOtp)
router.post('/userdata',auth,allUserData)
router.put('/userupdate',auth,userUpdate)
router.get('/alluser',auth,allUsers)
router.get('/checkauth',checkAuth)
router.get('/userdetails',auth,userDetails)
export default router  