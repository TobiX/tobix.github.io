# Tailscale Notes

Some notes for configuring (Docker) services in a Tailscale network.

For reference, all those services were set up on a TrueNAS Fangtooth 25.04
system using the integrated Docker-Compose support ("Apps").

This is mostly based on an [official blog post](https://tailscale.com/blog/docker-tailscale-guide).

## Tags

I'm using the `tag:homenas` tag for all service running on my TrueNAS system.
You can create it with the [visual editor](https://login.tailscale.com/admin/acls/visual/tags).

## Tokens

I use one token per container, which is probably overkill. You can create OAuth
tokens on the [trust credentials](https://login.tailscale.com/admin/settings/trust-credentials)
page. Give the permission "Keys", "Auth Keys", "Write" for oyur tag
`tag:homenas`.

## Examples

- [Beszel](beszel.md)
- [Home Assistant](home-assistant.md)
