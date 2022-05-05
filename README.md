# Performance analytics module

Performance analytics javascript module is client-side library, which collects some performance related key metrics from browser
and sends to the server.

## Available services

It measures followings natively.

- [TTFB (Time to first byte)]('https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte')
- [FCP (First contentful paint)]('https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint')
- Dom load
- Window load
- Network timings of document, image, font, js and css

## Techologies used

- RollupJs
- size-limit

## Bundle size

This module's size is 2.24 KB gzipped.

To calculate the size, simply run following

```bash
  yarn size
```
