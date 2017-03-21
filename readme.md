# Webpack Watch Log Plugin

Use magical emoji powers to bring clarity to your Webpack build output! ✨

## Installation

Install with npm:

```
npm install --save-dev webpack-watch-log-plugin
```

Then require it in your Webpack config:

```js
var WebpackWatchLogPlugin = require("webpack-watch-log-plugin");
```

And simply add it to your plugins list!

```js
plugins: [
  // plugins
  new WebpackWatchLogPlugin(),
  // more plugins
]
```

## Usage

The next time you run your Webpack build in "watch" mode, you'll get an emojified build summary, and a little timer telling you how long it's been since the last build. Nifty!
