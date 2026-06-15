const path = require("path");

const root = __dirname;

/** PM2 process config for Hostinger VPS deployment */
module.exports = {
  apps: [
    {
      name: "knmh-school",
      cwd: path.join(root, ".next/standalone"),
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      max_memory_restart: "512M",
      error_file: path.join(root, "logs/pm2-error.log"),
      out_file: path.join(root, "logs/pm2-out.log"),
      merge_logs: true,
      time: true,
    },
  ],
};
