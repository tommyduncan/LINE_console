var config = {
    LINE: {
        message: {},
        login: {
            authorization: 'https://access.line.me/oauth2/v2.1/authorize',
            getAccessToken: 'https://api.line.me/oauth2/v2.1/token',
            getUserProfiles: 'https://api.line.me/v2/profile',
            logout: 'https://api.line.me/oauth2/v2.1/revoke'
        }
    }
}

module.exports = config;