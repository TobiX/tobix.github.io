# Beszel

Creates [beszel](https://beszel.dev/) server and monitoring agent for the whole
system, exposed in your tailnet as `beszel.<yournet>.ts.net`.

For the internal socket directory, create an empty directory at `/run/beszel`.
You can use `tmpfiles.d` on many Linux distros or a "boot cron job" on TrueNAS
(command: `install -d /run/beszel`).

## Compose File

```yaml
services:
  agent:
    command: sh -c 'umask 0000; exec /agent'
    entrypoint: ''
    environment:
      KEY: ssh-ed25519 put-key-from-beszel-server-here
      LISTEN: /run/beszel/agent.sock
    healthcheck:
      interval: 120s
      test: [ 'CMD', '/agent', 'health' ]
    image: docker.io/henrygd/beszel-agent:latest
    network_mode: host
    restart: unless-stopped
    volumes:
      - /run/beszel:/run/beszel
      - /var/run/docker.sock:/var/run/docker.sock:ro
  server:
    depends_on:
      - tailscale
      - agent
    environment:
      DISABLE_PASSWORD_AUTH: 'false'  # Change for SSO
      USER_CREATION: 'true'
    healthcheck:
      interval: 120s
      start_period: 5s
      test: [ 'CMD', '/beszel', 'health', '--url', 'http://localhost:8090' ]
    image: docker.io/henrygd/beszel:latest
    network_mode: service:tailscale
    restart: unless-stopped
    user: '568:568'
    volumes:
      - /run/beszel:/run/beszel
      - /mnt/tank/data/beszel:/beszel_data
  tailscale:
    cap_add:
      - net_admin
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      TS_AUTHKEY: put-your-authkey-kere?ephemeral=false
      TS_ENABLE_HEALTH_CHECK: 'true'
      TS_EXTRA_ARGS: '--advertise-tags=tag:homenas'
      TS_SERVE_CONFIG: /etc/ts-serve.json
      TS_STATE_DIR: /srv/tailscale
      TS_ACCEPT_DNS: 'true'  # Needed to use TS IDP
      TS_USERSPACE: 'false'
    healthcheck:
      test: [ 'CMD', 'wget', '--spider', '-q', 'http://127.0.0.1:9002/healthz' ]
    hostname: beszel
    image: docker.io/tailscale/tailscale:latest
    restart: unless-stopped
    volumes:
      - /mnt/tank/admin/ts-beszel-serve.json:/etc/ts-serve.json:ro
      - tailscale-data:/srv/tailscale
volumes:
  tailscale-data:
```

## Serve config

Put into `/mnt/tank/admin/ts-beszel-serve.json`:

```json
{
  "TCP": {
    "443": {
      "HTTPS": true
    }
  },
  "Web": {
    "${TS_CERT_DOMAIN}:443": {
      "Handlers": {
        "/": {
          "Proxy": "http://127.0.0.1:8090"
        }
      }
    }
  },
  "AllowFunnel": {
    "${TS_CERT_DOMAIN}:443": false
  }
}
```

