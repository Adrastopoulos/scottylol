# scottylol

Scottylol is an exciting search tool for CMU. It is ScottyLabs' implementation of Facebook's internal bunnylol search tool.

## Setup `scottylol` as your search engine

- Navigate to search engine settings on your browser
- Add a new search engine called `scottylol` and set the url to `https://apis.scottylabs.org/lol/search?q=%s`
- Make `scottylol` your default search engine
- Type `token query` in your browser's search bar to see the power of `scottylol`. For example, `course 15251` will search our course tool for 15251!
- See below for how to add more useful commands to `scottylol` :)


## Dev instructions

### Deployment

```
npm run build
npm start
```

### Development Testing
```
npm run dev
```

### Adding new commands

Create a new YAML file in the `commands/` directory with the following syntax
```yaml
name: Command Name
description: Command Description
author: Your AndrewID
matches:
  - command
  - comm
  - c
home: https://google.com
searchUrl: https://google.com/search?q=
```

If you are not in ScottyLabs, please submit an issue to request a new command.
