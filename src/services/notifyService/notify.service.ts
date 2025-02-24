import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: "us-east-1" });

export default class NotifyService{
    
    public static async notifyClient(request:any){
        const params = {
            Destination: {
                ToAddresses: [request.email],
            },
            Message: {
                Body: {
                    Text: { Data: `Hola ${request.firstName} ${request.surname}, pelicula y sala reservada a las: ${request.reservationHour}`}, // Mensaje en texto plano
                },
                Subject: { Data: "Notificación Reserva Sala" },
            },
            Source: "fcardozo199@gmail.com",
        };
        try {
            const command = new SendEmailCommand(params);
            const response = await sesClient.send(command);
            console.log("Correo enviado con éxito:", response);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    }
}