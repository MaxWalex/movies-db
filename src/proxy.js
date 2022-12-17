const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', createProxyMiddleware({ target: 'https://videocdn.tv/', changeOrigin: true }));
    app.use('/api', createProxyMiddleware({ target: 'https://api.themoviedb.org/', changeOrigin: true }));
}
