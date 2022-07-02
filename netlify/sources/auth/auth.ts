import serverless from 'serverless-http'
import router from 'mongo-passport-auth-lib/serversingle'
const app = router({
    "mongoUri": "mongodb+srv://htmlbricks:v2HVRb4UiCgf2bre@cluster0.ksoyj.mongodb.net/htmlbricks?retryWrites=true&w=majority",
    "authPath": "/.netlify/functions/auth",
    "jwtSecret": "kgHUHUiipsr853_yeqGuET_9Wt",
    "local": {},
    "jwt": {
        audience: "htmlbricks",
        issuer: "htmlbricks",
        expiresIn: 60 * 60 * 24
    }
})
const handler = serverless(app)

export { handler }
