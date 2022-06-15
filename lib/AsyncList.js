export default class AsyncList {
    async toArray() {
        try {
            return await this.fetchArray()
        } catch(err) {
            console.error(error)
            return []
        }
    }
    async toJson() {
        return this.toArray()
    }
    async toPrettyJsonString() {
        return JSON.stringify( await this.toArray(), null, 2 )
    }
    async toJsonString() {
        return JSON.stringify( await this.toArray() )
    }
    async fetchArray() {
        return []
    }
}