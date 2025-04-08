# Castaway Vite Plugin

## Usage

This plugin provides a manual chunking strategy for `Castaway` projects, handling the different component frameworks used in your app and optimising page chunks.

```bash
npm install -D @decodelabs/vite-plugin-castaway
```

Add the plugin to your Vite config:

```javascript
import castaway from '@decodelabs/vite-plugin-castaway'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    castaway()
  ],
})
```

## Licensing

Castaway is licensed under the MIT License. See [LICENSE](./LICENSE) for the full license text.
