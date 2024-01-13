// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/sparql-endpoint',
    createProxyMiddleware({
      target: 'http://example.org', // Replace with your actual SPARQL endpoint
      changeOrigin: true,
    })
  );
};
