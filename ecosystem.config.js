// PM2 ecosystem — NCloud 배포용 (ADR-011)
module.exports = {
  apps: [
    {
      name: "fanoir",
      cwd: "/opt/app/current",
      script: ".next/standalone/server.js",
      instances: 2,
      exec_mode: "cluster",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: 3000,
      },
    },
  ],
};
