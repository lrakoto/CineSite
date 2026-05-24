# Asset Directory

Drop production assets here. They are served at `/assets/...` and never processed by Vite.

## videos/
Hero loop and background videos.
- `hero-loop.mp4` — 1080p, silent, looping, H.264, ideally under 10 MB
- Encode with: `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -an -movflags +faststart hero-loop.mp4`

## images/
Project card photography and any full-bleed editorial imagery.
- Recommended dimensions: 1400 × 900 px minimum for project cards (landscape 16:9 or 3:2)
- Name files to match the project slug: `maison-verre.jpg`, `polaris-studio.jpg`, etc.
- Use progressive JPEG or WebP for best performance

## fonts/
Self-hosted font files if you ever move off Google Fonts (e.g. for GDPR compliance or offline use).
- Preferred format: woff2
