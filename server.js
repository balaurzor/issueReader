const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());
app.use(express.static( __dirname + '/dist/issueReader'));
app.get('/*', function(_req, res) {
    res.sendFile(path.join(__dirname+'/dist/issueReader/index.html'));
});
app.post('/login/oauth/access_token', createProxyMiddleware({
    target: "https://github.com",
    changeOrigin: true
}));

app.listen(process.env.PORT || 8080);
