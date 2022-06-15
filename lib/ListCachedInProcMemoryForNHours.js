import AsyncList from './AsyncList.js';

export default class ListCachedInProcMemoryForNHours extends AsyncList {
    #lastUpdateTime = new Date;
    #cache;
    #originList;
    #cachingDurationMills;
    constructor(originList, cachingDurationHours = 1) {
        super()
        this.#originList = originList;
        this.#cachingDurationMills = 3600000 * cachingDurationHours
        
    }
    async toArray() {
        if(this.#cache === undefined || (new Date) - this.#lastUpdateTime >= this.#cachingDurationMills) {
            this.#cache = await this.#originList.toArray();
            this.#lastUpdateTime = new Date;
        }
        return this.#cache;
    }
    async toPrettyJsonString() {
        return JSON.stringify({
            "updated_at": this.#lastUpdateTime,
            "data": await this.toArray()
        }, null, 2)
    }
}