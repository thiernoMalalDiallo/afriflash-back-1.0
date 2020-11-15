import { Service } from "express-dependency-injection";
import { ObjectID } from "mongodb";

/**
 * Service encapsulant des fonctionnalités pour le bon fonctionnement de l'application
 */
@Service()
export class UtilsService{

    /**
     * Renvoie un ObjectId 
     * @param objectId ID
     */
    public getObjectId(objectId: any): ObjectID {

        let idObjectType = typeof objectId;

        if (idObjectType) {

            if(idObjectType == 'string') {

                objectId = new ObjectID(objectId);
            }
        }

        return objectId;
    }

    /**
     * Renvoie le string correpondant au ObjectId 
     * @param objectId ID
     */
    public getObjectIdString(objectId: Object): string {

        let objectIdString = '';

        if (objectId) {
            
            objectIdString = objectId.toString();
        }

        return objectIdString;
    }

    /**
     * Renvoi une date du type => "2020-06-12T00:00:00"
     * @param date 
     */
    public getStringFormatDate(date: Date) {
        let format = '';
        let month: any = date.getMonth()+1;
        let hour: any = date.getHours();
        let min: any = date.getMinutes();
        let sec: any = date.getSeconds();

        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }

        if (hour >= 1 && hour <= 9) {
            hour = '0' + hour;
        }

        if (min >= 1 && min <= 9) {
            min = '0' + min;
        }

        if (sec >= 1 && sec <= 9) {
            sec = '0' + sec;
        }

        format += date.getFullYear() + '-' + month + '-' + date.getDate()
                + 'T' + hour + ':' + min + ':' + sec;
        return format;
    }
}