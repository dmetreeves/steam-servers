
import SteamServerListFromConnectedClient from './lib/SteamServerListFromConnectedClient.js'
import ListCachedInProcMemoryForNHours from './lib/ListCachedInProcMemoryForNHours.js'
import FormattedSteamServerList from './lib/FormattedSteamServerList.js'
import express from 'express'
import basicAuth from 'express-basic-auth'
import 'dotenv/config'

const cachingDurationTenHours = 10;
const steamServers = 
    new ListCachedInProcMemoryForNHours(
        new FormattedSteamServerList(
            new SteamServerListFromConnectedClient({
                "account_name": process.env.STEAM_ACCOUNT_NAME,
                "password": process.env.STEAM_ACCOUNT_PASSWORD
            })
        ),
        cachingDurationTenHours
    )

const app = express()

app.use(basicAuth({
    users: JSON.parse(process.env.HTTP_SERVER_BASIC_AUTH_CREDS),
    challenge: true // <--- needed to actually show the login dialog!
}))

app.all('/', async function(req, res, next) {
    res.json( await steamServers.toJson() )
})

app.all('/pretty', async function(req, res, next) {
    res
        .type('json')
        .send( await steamServers.toPrettyJsonString() )
})

const port = process.env.HTTP_SERVER_PORT

app.listen(port, () => {
    console.log(`web app listening on port ${ port }`)
})