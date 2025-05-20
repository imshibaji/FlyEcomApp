import { Router } from "express";
import { UserController } from "../controllers/api/UserController";

const route = Router();

route.use('/users', new UserController());


export default route;