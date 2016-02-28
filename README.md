# HandlebarHelpers
A lightweight package with common helpers for [Handlebars](https://github.com/wycats/handlebars.js)

## Installation

```bash
$ npm install just-handlebars-helpers --save
```
## Usage

Browsers:
```html
<!-- Load Handlebars -->
<script type="text/javascript" src="/path/to/handlebars/dist/handlebars.min.js"></script>
<!-- Load the package -->
<script type="text/javascript" src="/path/to/just-handlebars-helpers/dist/h.min.js"></script>
<script type="text/javascript">
    // Register helpers for Handlebars
    H.registerHelpers(Handlebars);
</script>
```
Node:
```javascript
// Load Handlebars
var Handlebars = require('handlebars');
// Load the package
var H = require('just-handlebars-helpers');

// Register helpers for Handlebars
H.registerHelpers(Handlebars);
```

## Testing the helpers

```bash
# Install dependencies
$ npm install

# Compile everything
$ gulp

# Run all the tests
$ npm test
```

## Inspired by
 * [Swag](https://github.com/elving/swag)
 * [Dashbars](https://github.com/pismute/dashbars)
 * [Assemble](https://github.com/assemble/handlebars-helpers)
