import { Router } from "express";
import { home, login, signup } from "../Controllers /userControllers";

export const router=Router()

router.post('signup',signup)
router.post('login',login)
router.get('home',home)
