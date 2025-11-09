# Home Assistant

[Home Assistant](https://www.home-assistant.io/) want to use `network_mode:
host` so it can discover devices on the local network, so the setup is a bit
convoluted.

## Compose File

```yaml
services:
  home-assistant:
    cap_add:
      - NET_RAW
    depends_on:
      - tailscale
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0  # Expose Zigbee dongle
    image: ghcr.io/home-assistant/home-assistant:stable
    network_mode: host
    volumes:
      - /mnt/tank/data/home-assistant:/config
      - /etc/localtime:/etc/localtime:ro
  tailscale:
    cap_add:
      - net_admin
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      TS_AUTHKEY: put-your-authkey-kere?ephemeral=false
      TS_EXTRA_ARGS: '--advertise-tags=tag:homenas'
      TS_SERVE_CONFIG: /etc/ts-serve.json
      TS_STATE_DIR: /srv/tailscale
    hostname: homeassistant
    image: docker.io/tailscale/tailscale:latest
    restart: unless-stopped
    volumes:
      - /mnt/tank/admin/ts-ha-serve.json:/etc/ts-serve.json:ro
      - tailscale-data:/srv/tailscale
networks:
  default:
    ipam:
      config:
        - gateway: 192.168.99.1
          subnet: 192.168.99.0/24
volumes:
  tailscale-data:
```

## Serve config

Put into `/mnt/tank/admin/ts-ha-serve.json`:

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
          "Proxy": "http://192.168.99.1:8123"
        }
      }
    }
  },
  "AllowFunnel": {
    "${TS_CERT_DOMAIN}:443": false
  }
}
```

## Home Assistant Config

Restrict the home assistant web server to the "internal" network for the
tailnet. Add this to `/mnt/tank/data/home-assistant/configuration.yaml`:

```yaml
http:
  server_host: 192.168.99.1
  use_x_forwarded_for: true
  trusted_proxies: 192.168.99.0/24
```

