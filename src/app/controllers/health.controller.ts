import { Controller } from "./controller";

export class HealthController extends Controller {


    public async sendMensaje(){
        return this.response.status(200).send('Hello World')
    }
}
