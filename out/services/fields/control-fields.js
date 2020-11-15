"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControlFields {
    /**
     * Vérifie si la valeur d'un champ de type string est vide
     * @param field valeur du champ
     */
    isEmpty(field) {
        if (field.trim() === '') {
            return true;
        }
        return false;
    }
    /**
     * Verifie si le numéro est valide
     * @param pseudo numéro de l'utilisateur
     */
    controlPhoneNumber(number) {
        // TODO : Utiliser une regex pour le numéro de type GUINNEE
        return true;
    }
    /**
     * Verifie l'email
     * @param email email de l'utilisateur
     */
    controlEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email.trim());
    }
    /**
     * Verifie le mot de passe
     * @param password mot de passe de l'utilisateur
     */
    controlPassword(password) {
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
    controlConfirmPassword(confirmPassword) {
        if (confirmPassword === this.password) {
            return true;
        }
        return false;
    }
}
exports.ControlFields = ControlFields;
//# sourceMappingURL=control-fields.js.map