// Deployment config for pm2
module.exports = {
  apps: [
    {
      name: "optimizely-cms",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        HOSTNAME: "0.0.0.0",
        PORT: 3000,
        NODE_USE_ENV_PROXY: 1,
        http_proxy: "http://wwwgate.ti.com:80",
        HTTPS_PROXY: "http://wwwgate.ti.com:80",
        NO_PROXY: ".ti.com,localhost,127.0.0.1"
      },
    },
  ],
};
