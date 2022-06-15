import Steam from 'steam';
import AsyncList from './AsyncList.js';

export default class SteamServerListFromConnectedClient extends AsyncList {
    #creds
    constructor(creds) {
        super()
        this.#creds = creds
    }
    fetchArray() {
        const creds = this.#creds;
        return new Promise((resolve, reject) => {
            const steamClient = new Steam.SteamClient();
            const steamUser = new Steam.SteamUser(steamClient);
            steamClient.on('connected', function() {
                steamUser.logOn({
                    account_name: creds.account_name,
                    password: creds.password,
                });
            });
            steamClient.on('servers', function(servers) {
                resolve(servers);
                steamClient.disconnect();
            });
            steamClient.on('error', function(error) {
                reject(error);
                steamClient.disconnect();
            });
            steamClient.connect();
        });
    }
}