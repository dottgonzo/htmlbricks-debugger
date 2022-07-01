import serverless from 'serverless-http'
import router from 'mongo-passport-auth-lib/serversingle'
const app = router({
    "mongoUri": "mongodb://rutt0l4ZZ0:6d8fTpmzd89l2l0D670oKhu82mntJh2apSz434hU@mongo1.mongo.kernel.online:27017,mongo2.mongo.kernel.online:27017,mongo3.mongo.kernel.online:27017/htmlbricks?authSource=admin&authMechanism=SCRAM-SHA-1",
    "authPath": "/.netlify/functions/auth",
    "jwtSecret": "kgHUHUiipsr853_yeqGuET_9Wt",
    "local": {},
    "jwt": {
        audience: "sportelloamico",
        issuer: "sportelloamico",
        expiresIn: 60 * 60 * 24
    }
})
const handler = serverless(app)

export { handler }
