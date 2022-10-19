# installation

## global
```
npm install -g localise
```
## project
```
npm install --save localise
```

# import to your projet
```
const Localise = require('localise'); // module
import Localise from 'localise'; // ES6

localise.import
localise.extract
```

# use as commandline
```

localise.import
localise.extract

```
# import
## usage
```
node index.js import -m --key YOUR_KEY --ext json --dest './tmp/{locale}.{ext}'

API_KEY=YOUR_KEY node index.js import -mb --ext json --dest './tmp/bundle.{ext}'
```

## params
### key (-k, --key)
The key to acces your localise. You can also provie a API_KEY as environment variable to have it define only once for your server
```
API_KEY=... localise import ...
```

### minify (-m, --minify)
### bundle (-b, --bundle)
