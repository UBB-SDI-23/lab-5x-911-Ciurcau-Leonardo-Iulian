import App from "../app";

class CurrentUser {
    static #instance = null;
    static #constructorAccess = false;
    #username = null;
    #accessToken = null;
    #roles = [];

    constructor() {
        if (!CurrentUser.#constructorAccess) {
            throw new TypeError("Construction of object unaccesable");
        }
        else {
            CurrentUser.#constructorAccess = false;
        }
    }

    getUsername() {
        return this.#username;
    }

    setUsername(username) {
        this.#username = username;
    }

    getAccessToken() {
        return this.#accessToken;
    }

    setAccessToken(accessToken) {
        this.#accessToken = accessToken;
    }

    isAuthenticated() {
        return this.#accessToken !== null;
    }

    async getId() {
        return await fetch(App.API_URL + '/api/users/' + this.#username + '/id')
                .then(response => response.json())
                .then(data => data.id);
    }

    setRoles(roles) {
        this.#roles = roles;
    }

    getRoles() {
        return this.#roles;
    }

    static getInstance() {
        if (CurrentUser.#instance === null) {
            CurrentUser.#constructorAccess = true;
            CurrentUser.#instance = new CurrentUser();
        }
        return CurrentUser.#instance;
    }
}

export default CurrentUser;