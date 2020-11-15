import { ControlFields } from "./control-fields";
import { Service } from "express-dependency-injection";
import { Response } from "express";
import { of } from "rxjs";

@Service()
export class ControlRegistrationFields extends ControlFields{

    public controlRegistration(form: {
        firstName: string,
        lastName: string,
        gender: string,
        email?: string,
        password: string,
        phoneNumber: string
    }){
        let ok = true;

        if(form.email){
            ok = this.isEmpty(form.firstName) && !this.isEmpty(form.lastName) && 
            !this.isEmpty(form.gender) && !this.controlEmail(form.email) && 
            !this.controlPassword(form.password) && this.controlPhoneNumber(form.phoneNumber);
        } else {
            ok = !this.isEmpty(form.firstName) && !this.isEmpty(form.lastName) && 
            !this.isEmpty(form.gender) && this.controlPassword(form.password) && 
            this.controlPhoneNumber(form.phoneNumber);
        
        }
        return ok;
    }

    public getErroMessge(message: string, res: Response){
        return of({errorMessage: message}).subscribe(
                (data) => data != null ? res.json(data) : null,
                error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
                () => { res.end()}
            );
    }
}