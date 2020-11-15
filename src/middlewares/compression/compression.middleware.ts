import { AbstractMiddleware, ExMiddleware } from "express-dependency-injection";
import { Request, Response } from "express";
import * as compression from "compression";
import { ExpressMiddleware } from "../../types/function.type";

@ExMiddleware()
export class CompressionMiddleware extends AbstractMiddleware {
    
    public handle(): ExpressMiddleware {

        return compression();
    }

    public run(req: Request, res: Response) {
        
        // throw new InvalidFunctionCallException('this function is not implemented for this middleware');
    }

    
}