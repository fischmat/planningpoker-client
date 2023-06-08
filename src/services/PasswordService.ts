import _ from "lodash"


const PASSWORDS_LS_KEY = "gamePasswords"

export const passwordService = {
    
    storeGamePassword(gameId: string, password: string) {
        const passwordsByGameId = this._getPasswords()
        _.set(passwordsByGameId, gameId, password)
        this._storePassword(passwordsByGameId)
    },

    getGamePassword(gameId: string): string | null {
        const passwordsByGameId = this._getPasswords()
        return _.get(passwordsByGameId, gameId, null)
    },

    _getPasswords(): object {
        const json = localStorage.getItem(PASSWORDS_LS_KEY)
        if (json) {
            return JSON.parse(json)
        } else {
            return {}
        }
    },

    _storePassword(passwords: object) {
        const json = JSON.stringify(passwords)
        localStorage.setItem(PASSWORDS_LS_KEY, json)
    }
}
