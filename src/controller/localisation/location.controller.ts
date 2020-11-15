import {AbstractRouter, ExRoute, ExRouter, HttpVerbs, Inject} from "express-dependency-injection";
import {BodyParserMiddleware} from "../../middlewares/body-parser/body.parser.middleware";
import {Request, Response} from "express";
import {from, Subscription} from "rxjs";
import {LocationRepository} from "../../repository/localisation/location.repository";
import {LocationModel} from "../../models/localisation/location.model";

/**
 * Controller lié aux localisations.
 */
@ExRouter({
    path: "/location"
})
export class LocationController extends AbstractRouter {

    @Inject(LocationController)
    private readonly repoLocation: LocationRepository;

    /**
     * Enregistrement d'un pays
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/save",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public post(_req: Request, res: Response, args: {
        body: {
            countryName: string,
            city: string,
            zipCode: string,
            details: string,
            cordonnes?: any
        }
    }): Subscription {
        let newLocation = new LocationModel();
        newLocation.countryName= args.body.countryName;
        newLocation.city = args.body.city;
        newLocation.zipCode = args.body.zipCode;
        newLocation.details = args.body.details;
        newLocation.cordonnes = args.body.cordonnes;

        return from(this.repoLocation.save(newLocation)).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({ message: 'la requête à été interompu : '+error }),
            () => res.end(),
            )

    }

    /**
     * Retourne un pays à partir de son id
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/:id",
        verb: HttpVerbs.GET
    })
    public get(_req: Request, res: Response, args: {body: null, params: {id: string}}): Subscription {

        return from(this.repoLocation.findById(args.params.id)).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({ message: 'la requête à été interompu : '+error }),
            () => res.end()
        )


    }

    /**
     * Retourne la liste de toute de localisation
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/",
        verb: HttpVerbs.GET
    })
    public findAll(_req: Request, res: Response, args: {body: null, params: {id: string}}): Subscription {
        return from(this.repoLocation.getAll()).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({ message: 'la requête à été interompu : '+error }),
            () => res.end()
        )

    }

    /**
     * Modification d'une localisation
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/update/:id",
        verb: HttpVerbs.PUT,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public put(_req: Request, res: Response, args: {body: LocationModel, params: {id: string}
    }): Subscription {

        return from(this.repoLocation.update(args.params.id,args.body)).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({ message: 'la requête à été interompu : '+error }),
            () => res.end()
        )

    }

    /**
     * Suppression d'une localisation
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/delete/:id",
        verb: HttpVerbs.DELETE
    })
    public delete(_req: Request, res: Response, args: {params: {id: string}}): Subscription {
        return from(this.repoLocation.delete(args.params.id)).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({ message: 'la requête à été interompu : '+error }),
            () => res.end()
        )

    }

}
