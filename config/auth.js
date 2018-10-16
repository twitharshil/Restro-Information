// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '859747437556022', // your App ID
        'clientSecret'  : 'aff7f3e7de3e46690ba16b307c2ad860', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '792346166639-1aek696rf99ls64804ru7h2sdbsd4bl2.apps.googleusercontent.com',
        'clientSecret'  : '8Vvzt95igBq5UjXbAPBDsCX_',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
