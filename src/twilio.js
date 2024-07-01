// const twilio = require("twilio");

// const accountSid = "AC934b0a09dac3064bc65f51216d73557c";
// const authToken = "73c24e4680f6e7b90ff38ff847e0a177";
// const client = twilio(accountSid, authToken);

// const sendWhatsAppMessage = async formData => {
//   try {
//     const message = await client.messages.create({
//       from: "whatsapp:+16509771325",
//       to: "whatsapp:+50432704277",
//       body: `Nuevo formulario enviado por ${formData.nombres} ${formData.apellido}. Email: ${formData.email}`,
//     });
//     console.log("Mensaje enviado:", message.sid);
//   } catch (error) {
//     console.error("Error al enviar mensaje de WhatsApp:", error);
//   }
// };

// module.exports = { sendWhatsAppMessage };
