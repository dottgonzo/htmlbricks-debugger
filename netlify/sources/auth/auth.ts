import serverless from 'serverless-http'
import router from 'mongo-passport-auth-lib/serversingle'
const app = router({
    "mongoUri": "mongodb+srv://htmlbricks:v2HVRb4UiCgf2bre@cluster0.ksoyj.mongodb.net/htmlbricks?retryWrites=true&w=majority",
    "authPath": "/.netlify/functions/auth",
    "jwtSecret": "kgHUHUi;ri8mRTYtr_;r86I67mtWt",
    "local": {},
    "jwt": {
        audience: "htmlbricks",
        issuer: "htmlbricks",
        expiresIn: 60 * 60 * 24
    }
})
export const handler = (event, context) => {
    // you can do other things here
    const result = serverless(app);
    // and here
    return result;
};