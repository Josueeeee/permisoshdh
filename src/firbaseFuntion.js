const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.updateRequestStatus = functions.https.onCall(async (data, context) => {
  const { requestId, status } = data;

  try {
    const requestRef = db.collection("formSubmissions").doc(requestId);
    await requestRef.update({ status });

    return { success: true, message: `Request ${status}` };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, message: "Failed to update request status" };
  }
});
