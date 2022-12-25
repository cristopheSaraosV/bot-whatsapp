import { APPLICATION } from '../../../environment';
import { Controller } from "./controller";
import axios, {isCancel, AxiosError} from 'axios';

export class WhatsAppController extends Controller {


  token = APPLICATION.TOKEN;
    
    public async health(){
        return this.response.status(200).json({
            rest:'Health'
        })
    }

    public async sendMensaje(){
        let body = this.request.body;

        // Check the Incoming webhook message
        console.log(JSON.stringify(this.request.body, null, 2));
      
        // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
        if (this.request.body.object) {
          if (
            body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0] &&
            body.entry[0].changes[0].value.messages &&
            body.entry[0].changes[0].value.messages[0]
          ) {
            let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
            let msg_body = body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
            axios({
              method: "POST", // Required, HTTP method, a string, e.g. POST, GET
              url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                this.token,
              data: {
                messaging_product: "whatsapp",
                to: from,
                text: { body: "Ack: " + msg_body },
              },
              headers: { "Content-Type": "application/json" },
            });
          }
          this.response.sendStatus(200);
        } else {
          // Return a '404 Not Found' if event is not from a WhatsApp API
          this.response.sendStatus(404);
        }
    }
    


    public async verifyToken(){
        const verify_token = process.env.VERIFY_TOKEN;

        // Parse params from the webhook verification request
        let mode      = this.request.query["hub.mode"];
        let token     = this.request.query["hub.verify_token"];
        let challenge = this.request.query["hub.challenge"];
      
        // Check if a token and mode were sent
        if (mode && token) {
          // Check the mode and token sent are correct
          if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            this.response.status(200).send(challenge);
          } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            this.response.sendStatus(403);
          }
        }
    }
}
