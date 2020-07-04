module.exports = {
    publish: false,
    get domain() {
        return ((this.publish == true) ? 'https://anhpeter-login.web.app' : 'http://localhost:5000');
    },
    prefix: {
        index: '/',
    }
}