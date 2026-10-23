module.exports = {
  apps: [{
    name: "asianhire-app",
    script: "npm",
    args: "start -- -p 3013",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "8G",
    exec_mode: "cluster"
 }]
}