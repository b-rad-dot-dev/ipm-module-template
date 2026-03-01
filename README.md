# About

This repository serves as a template for creating new modules for the info-panel dashboard. It follows the current
recommended design pattern and practices for authoring modules.

## Modules MUST:

- Export default class in a file named `index.js`
- Use Shadow DOM
- Use CSS variables
- Avoid globals
- Clean up in destroy()

## Modules SHOULD:

- Prefix internal custom elements
- Avoid external CDNs
- Be self-contained

## Modules MUST NOT:

- Register unprefixed custom elements
- Modify window
- Access other modules

## Available CSS variables:

- `--background`
- `--border`
- `--component-background`
- `--component-border`
- `--component-padding`
- `--component-border-radius`
- `--font-color-default`
- `--font-color-secondary`
- `--font-color-primary`
- `--font-size`