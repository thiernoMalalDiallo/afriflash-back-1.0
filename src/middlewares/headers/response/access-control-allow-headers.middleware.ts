import { Request, Response } from "express";
import { AbstractMiddleware, ExMiddleware } from "express-dependency-injection";

/**
 * Middleware implementation for Express Response Access-Control-Allow-Headers setter
 */
@ExMiddleware()
export class AccessControlAllowHeadersMiddleware extends AbstractMiddleware {

    public run(_req: Request, res: Response) {

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
}