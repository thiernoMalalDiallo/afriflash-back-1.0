import {Subscription, from} from 'rxjs';
import {ExRouter, AbstractRouter, ExRoute, HttpVerbs, Inject} from "express-dependency-injection";
import {BodyParserMiddleware} from "../../middlewares/body-parser/body.parser.middleware";
import {Request, Response} from "express";
import {LoginRepository} from '../../repository/users/login.repository';
import {Login} from '../../models/users/login.model';
import {User} from "../../models/users/user.model";
import {UserRepository} from '../../repository/users/user.repository';
import {mergeMap, map} from 'rxjs/operators';
import {UtilsService} from '../../services/utils/utils.service';


/**
 * Controller lié aux login.
 */
@ExRouter({
    path: "/login"
})
export class LoginController extends AbstractRouter {

    @Inject(LoginRepository)
    private readonly repoLogin: LoginRepository;

    @Inject(UserRepository)
    private readonly repoUser: UserRepository;

    /**
     * Enregistre un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
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
            provider: string,
            id: string,
            email: string,
            name: string,
            image: string,
            token?: string,
            idToken?: string,
            password?: string,
        }
    }): Subscription {
        let newLogin = new Login();
        let user = new User();

        newLogin.provider = args.body.provider;
        newLogin.id = args.body.id;
        newLogin.email = args.body.email;
        newLogin.name = args.body.name;
        newLogin.image = args.body.image;
        newLogin.token = args.body.token;
        newLogin.idToken = args.body.idToken;
        args.body.password ? newLogin.password = User.hashPassword(args.body.password) : '';

        if (args.body.provider === 'google' || args.body.provider === 'email') {
            user.email = args.body.email
        }
        if (args.body.provider === 'telephone') {
            user.phoneNumber = args.body.email;
        }
        if (args.body.provider === 'facebook') {

        }
        args.body.password ? user.password = User.hashPassword(args.body.password) : '';

        return from(this.repoLogin.save(newLogin)).pipe(
            mergeMap(
                (login) => {
                    user.loginId = this.repoUser.utilService.getObjectId(login.getObjectId());
                    return from(this.repoUser.save(user)).pipe(
                        map(
                            (user) => {
                                return login;
                            }
                        )
                    )
                }
            )
        ).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            });
    }


    /**
     * Enregistre un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/update-informations",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public updateInformation(_req: Request, res: Response, args: {
        body: {
            userId: string,
            password: string,
            name: string,
            email: string
        }
    }): Subscription {

        return from(this.repoLogin.updateInformation(args.body)).subscribe(
            data => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            });
    }


    /**
     * retourner un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/:id",
        verb: HttpVerbs.GET
    })
    public get(_req: Request, res: Response, args: { body: null, params: { id: string } }): Subscription {
        return from(this.repoLogin.findById(args.params.id)).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
                // this.repoLogin.closeDatabase()
            },
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            })

    }

    /**
     * retourner un objet user
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/user/",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public getUserByLogin(_req: Request, res: Response, args: {
        body: {
            email: string,
            password: string,
            type: string
        },
        params: null
    }): Subscription {
        return from(this.repoLogin.findByLogin(args.body.email, args.body.password, args.body.type)).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
            },
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            })

    }

    /**
     * retourner tous les login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/",
        verb: HttpVerbs.GET
    })
    public findAll(_req: Request, res: Response, args: { body: null, params: { id: string } }): Subscription {

        return from(this.repoLogin.getAll()).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
                //  this.repoLogin.closeDatabase()
            },
            () => {
                res.end()
                //   this.repoLogin.closeDatabase()
            })

    }

    /**
     * supprimer un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/delete/:id",
        verb: HttpVerbs.DELETE
    })
    public delete(_req: Request, res: Response, args: { params: { id: string } }): Subscription {
        return from(this.repoLogin.delete(args.params.id)).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
                //  this.repoLogin.closeDatabase()
            },
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            })

    }

}
