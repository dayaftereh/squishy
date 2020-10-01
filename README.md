# Squishy

Squishy is a browser based data transform pipeline, which can be programmed with [Javascript](https://en.wikipedia.org/wiki/JavaScript).
It allows to load file from local file-system, transform the content and export the output via download.

## Demo

[Squishy Editor](https://dayaftereh.github.io/squishy) is the last release and published on [Github Pages](https://pages.github.com/).
Or use the [Unstable Version](https://dayaftereh.github.io/squishy/latest) from the last build.

## Documentation

The documentation is included into squishy and can be found at the [Squishy Documentation](https://dayaftereh.github.io/squishy/#/documentation).

## Supported Browser

The following browsers are supported by *Squishy*.

| Browser       | Version |  Editor | Runner | File Size |
|---------------|---------|---------|--------|-----------|
| Safari        | 13.1+   | Yes     | Yes    | -         |
| Firefox       | 64+     | Yes     | Yes    | 1GB       |
| Google Chrome | 81+     | Yes     | Yes    | 500MB     |

# Build

Install the npm packages described in the package.json and verify that it works:

```bash
npm install
```

Use the `build` command to build (compiles TypeScript and copies assets) the application into `./dist` directory.

```bash
npm run build
```

Copy the content of the `./dist` directory to the web-server.
