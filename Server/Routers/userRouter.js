import { allUsers,  login, signup } from "../Controllers /userControllers.js";
import  Express  from 'express'
import  {auth} from "../Middleware/Auth.js";

  const router=Express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/alluser',auth,allUsers)
export default router