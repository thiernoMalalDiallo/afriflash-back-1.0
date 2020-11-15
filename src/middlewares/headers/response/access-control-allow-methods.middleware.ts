import { Request, Response } from "express";
import { AbstractMiddleware, ExMiddleware } from "express-dependency-injection";

/**
 * Middleware implementation for Express Response Access-Control-Allow-Headers setter
 */
@ExMiddleware()
export class AccessControlAllowMethodsMiddleware extends AbstractMiddleware {

    public run(_req: Request, res: Response) {

        res.header("Access-Control-Allow-Methods", "Origin, PUT, POST, DELETE, GET, OPTIONS");
    }
}
