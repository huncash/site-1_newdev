/** PM2 — site-1 production. Index gate explicit a process env-ben. */
module.exports = {
  apps: [
    {
      name: "site-1",
      cwd: "/var/www/site-1",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        ALLOW_PUBLIC_INDEXING: "1",
      },
    },
  ],
};
