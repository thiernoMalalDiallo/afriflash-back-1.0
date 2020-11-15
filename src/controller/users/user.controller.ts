import {ExRouter, AbstractRouter, ExRoute, HttpVerbs, Inject} from "express-dependency-injection";
import {Request, Response} from "express";

import {UserRepository} from '../../repository/users/user.repository';
import {from, Subscription} from 'rxjs';
import {BodyParserMiddleware} from "../../middlewares/body-parser/body.parser.middleware";
import {User} from "../../models/users/user.model";


/**
 * Controller principal des utilisateurs - toutes les requêtes qui concerne les utilisateurs passeront par la.
 */
@ExRouter({
    path: "/user"
})
export class UserController extends AbstractRouter {

    @Inject(UserRepository)
    private readonly repoUser: UserRepository;

    /**
     * Retourne tous les utilisateurs
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/",
        verb: HttpVerbs.GET
    })
    public findAll(_req: Request, res: Response, args: { body: null, params: { id: string } }): Subscription {

        return from(this.repoUser.getAll()).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )

    }

    /**
     * Enregistrement d'un utilisateur
     * @param _req
     * @param res
     * @param args
     */
    @ExRoute({
        path: "/save",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public post(_req: Request, res: Response, args: {
        body: {
            password: string,
            firstName: string,
            pseudo: string,
        }
    }): Subscription {

        let newUser = new User();
        console.log(args);
        newUser.pseudo = args.body.pseudo;
        newUser.password = User.hashPassword(args.body.password);
        newUser.firstName = args.body.firstName;

        newUser.dateOfCreation = new Date();

        return from(this.repoUser.save(newUser)).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )

    }


    /**
     * Connection a l'application
     * @param _req
     * @param res
     * @param args
     */
    @ExRoute({
        path: "/login",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public authentication(_req: Request, res: Response, args: {
        body: {
            password: string,
            pseudo: string,
        }
    }): Subscription {
        return from(this.repoUser.findUserByLogin(args.body.pseudo, args.body.password)).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )
    }


}
