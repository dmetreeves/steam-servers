import AsyncList from './AsyncList.js';

export default class FormattedSteamServerList extends AsyncList {
    #origin;
    constructor(origin) {
        super()
        this.#origin = origin;
    }
    async toArray() {
        return (await this.#origin.toArray()).map(
            server => ({
                address: server.host,
                port: server.port
            })
        )
    }
}