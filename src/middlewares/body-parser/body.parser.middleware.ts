import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { ExpressMiddleware } from "../../types/function.type";
import { ExMiddleware, AbstractMiddleware } from "express-dependency-injection";

/**
 * Implementation for the body-parser node express middleware
 */
@ExMiddleware()
export class BodyParserMiddleware extends AbstractMiddleware {

    public handle(): ExpressMiddleware {

        return bodyParser.json({limit: '50mb'});
    }

    public run(_req: Request, _res: Response) {

        // throw new InvalidFunctionCallException('this function is not implemented for this middleware');
    }


}