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
      },
    },
  ],
};
