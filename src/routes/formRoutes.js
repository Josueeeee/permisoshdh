// const express = require("express");
// const router = express.Router();
// const { sendWhatsAppMessage } = require("../twilio");

// router.post("/submit", async (req, res) => {
//   const formData = req.body;

//   try {
//     // Lógica para guardar el formulario en Firebase
//     // ...

//     // Enviar mensaje de WhatsApp
//     await sendWhatsAppMessage(formData);

//     res
//       .status(200)
//       .send({ message: "Formulario enviado y notificación enviada." });
//   } catch (error) {
//     res
//       .status(500)
//       .send({
//         message: "Error al enviar el formulario o la notificación.",
//         error,
//       });
//   }
// });

// module.exports = router;
