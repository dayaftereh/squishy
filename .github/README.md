# Squishy

Squishy is an in browser data **transformer** and **visualizer**. 

<p align="center">
    <img alt="Squishy" src="./src/assets/documentation/png/squishy-editor.png">
</p>

It's allows to load, transform, visualize and export any type of data, by writing **glue code** with [Javascript](https://en.wikipedia.org/wiki/JavaScript).
Thanks to the additional **visual programming editor** script, load, transform, visualize and export nodes can be connect to build complex transformation pipelines or visualizations.
However, squishy runs in all modern browser and doesn't require any installation.

## Playground

The [Squishy Playground](https://dayaftereh.github.io/squishy) is the **last** released version of Squishy and can be used right away.
Additionally the playground comes with a deeper documentation and a set of examples to get started.
For experimental usage or more advanced users the [Unstable Playground](https://dayaftereh.github.io/squishy/latest) from the last commit can be used.

## Supported Browser

The following browsers are supported and tested by *Squishy*.

| Browser       | Version |  Editor | Runner | File Size |
|---------------|---------|---------|--------|-----------|
| Safari        | 13.1+   | Yes     | Yes    | -         |
| Firefox       | 64+     | Yes     | Yes    | 1GB       |
| Google Chrome | 81+     | Yes     | Yes    | 500MB     |

## Release

The last release of the playground can be found as a archive under [Releases](https://github.com/dayaftereh/squishy/releases).
The release archive contains the **web-content** for a static web-server.
Remember squishy needs to be served from a web-server to run properly.
For everyone how wants to build squishy by it's own, checkout the **build** section.

## Build

Install the npm packages described in the `package.json` and verify that it works:

```bash
npm install
```

Use the `build` command to build the application into `./dist` directory.

```bash
npm run build
```

Open the `./dist` directory and there should be a archive with the name like `squishy-x.x.x*.zip`.

