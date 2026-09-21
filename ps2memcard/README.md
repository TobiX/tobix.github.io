---
layout: base
permalink: /ps2memcard/
---

# PlayStation 2 Boot Memory Card

I'm using a [PSxMemCard Gen2](https://www.bitfunxshop.com/products/bitfunx-psxmemcard-gen2-for-ps1-psone-and-ps2-games-memory-cards)
from BitFunx with the [SD2PSXTD](https://sd2psxtd.github.io/) firmware and was
a little disappointed by the missing provinence of availaible boot memcard
images:

- The [prebuild images](https://github.com/israpps/FreeMcBoot-Installer/releases/tag/mcpro2-img) of FreeMcBoot are incompatible
- The [images on sd2psx.net](https://sd2psx.net/ps2-exploit.html) are of
  unknown vintage and don't tell me which variant of FreeMcBoot they contain

So [here's my image](BootCard-1.mcd), put it into `MemoryCards/PS2/BOOT/BootCard-1.mcd` and have fun. It contains:

- FreeMcBoot 1.966 from [2025-01-01](https://github.com/israpps/FreeMcBoot-Installer/releases/tag/latest) with exFAT support
- OpenPS2Loader [v1.2.0-Beta-2245-3e3f34e](https://github.com/ps2homebrew/Open-PS2-Loader/releases/tag/latest) (2026-09-20)
- wLaunchELF\_ISR [74550d8](https://github.com/israpps/wLaunchELF_ISR/releases/tag/latest) (2026-01-14) (exFAT, DS34, MMCE, XFROM)
- OSD-XMB [2.2.0](https://github.com/HiroTex/OSD-XMB/releases/tag/v2.2.0) (2025-09-21)

To use OSD-XMB, please unpack the `OSDXMB` folder from the [release archive](https://github.com/HiroTex/OSD-XMB/releases/download/v2.2.0/OSDXMB-2.2.0.zip) to the root of your sd2psx SD card.

Feel free to use [PS2 Memory Card Browser](https://sd2psxtd.github.io/memcard_browser/) to remove stuff you don't need.
