import { home, login, signup } from "../Controllers /userControllers.js";
import  Express  from 'express'

  const router=Express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/home',home)
export default router