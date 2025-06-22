import { userPaymentModel } from "../../models/UserPayment";
import BaseController from "../BaseController";


export class UserPaymentController extends BaseController {

    constructor() {
        super(userPaymentModel, 'user_payment', {
            title: 'User Payment',
            asApi: true
        });
    }

}