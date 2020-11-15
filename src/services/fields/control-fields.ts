
export abstract class ControlFields {

    /**
     * Mot de passe - utilisé pour verifier le champ confirmer mot de passe
     */
    protected password;

    /**
     * Vérifie si la valeur d'un champ de type string est vide
     * @param field valeur du champ
     */
    protected isEmpty(field: string){
        if(field.trim() === ''){
            return true;
        }
        return false;
    }

    /**
     * Verifie si le numéro est valide
     * @param pseudo numéro de l'utilisateur
     */
    protected controlPhoneNumber(number: string) {
        // TODO : Utiliser une regex pour le numéro de type GUINNEE
        return true;
    }

    /**
     * Verifie l'email
     * @param email email de l'utilisateur
     */
    protected controlEmail(email: string) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email.trim());
    }

    /**
     * Verifie le mot de passe
     * @param password mot de passe de l'utilisateur
     */
    protected controlPassword(password: string) {
        if (password.length >= 6) {
            this.password = password;
            return true;
        }
        return false;
    }

    /**
     * Verifie la confirmation du mot de passe
     * @param confirmPassword confirmation mot de passe
     */
    protected controlConfirmPassword(confirmPassword: string) {
        if (confirmPassword === this.password) {
            return true;
        }
        return false;
    }

}