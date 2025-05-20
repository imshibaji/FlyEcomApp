import { Router } from "express";
import FrontController from "../controllers/FrontController.js";

const route = Router();
const fc = new FrontController();

route.get('/', fc.home);
route.get('/about', fc.about);
route.get('/contact', fc.contact);
route.get('/users', fc.users);



export default route;