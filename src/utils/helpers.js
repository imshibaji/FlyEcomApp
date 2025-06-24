import { Router } from "express";

export function controllersRouter(controllers) {
    const router = Router();
    for (const object of controllers) {
        object.registerRoutes(router);
    }
    return router;
}