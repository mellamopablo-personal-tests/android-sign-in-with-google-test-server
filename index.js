"use strict";

const GoogleAuth = require("google-auth-library")
    , express    = require("express")
    , bodyParser = require("body-parser");

const GOOGLE_API_CLIENT_ID =
    "922325936396-gb9hvho675353pr218mbjvtvbuvnq649.apps.googleusercontent.com";

const PORT = process.env.PORT || 3000;
const app = express();
const auth = new GoogleAuth;
const gClient = new auth.OAuth2(GOOGLE_API_CLIENT_ID, "", "");

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
    if (!req.body.idToken) {
        return res.status(400).send(JSON.stringify({
            error: "The idToken is missing."
        }));
    }

    try {

        let user = await getUserFromToken(req.body.idToken);
        console.log("User authenticated:", user);
        res.status(200).send();

    } catch(e) {

        res.status(401).send(JSON.stringify({
            error: "Google authentication failed."
        }));

    }
});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

const getUserFromToken = token => new Promise((fulfill, reject) => {

    gClient.verifyIdToken(token, GOOGLE_API_CLIENT_ID, (e, login) => {

        if (e) {
            return reject(e);
        }

        const payload = login.getPayload();
        return fulfill({
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            googleId: payload.sub
        });

    });

});