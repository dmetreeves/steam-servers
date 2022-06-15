import SteamServerListFromConnectedClient from './lib/SteamServerListFromConnectedClient.js'
import FormattedSteamServerList from './lib/FormattedSteamServerList.js'
import 'dotenv/config'

(async () => {
    const steamServers =
        new FormattedSteamServerList(
            new SteamServerListFromConnectedClient({
                "account_name": process.env.STEAM_ACCOUNT_NAME,
                "password": process.env.STEAM_ACCOUNT_PASSWORD
            })
        )
    console.log( await steamServers.toJson() )
})()