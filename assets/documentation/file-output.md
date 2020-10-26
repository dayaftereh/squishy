# File-Output

The file output node allows to output the incoming ```data```, which means the ```data``` is pushed to a download file from the local page. However this gives the option to output ``data`` into the local computer file system.

<p align="center">
    <img alt="File-Output" src="./assets/documentation/png/file-output.png">
</p>

## Properties

Following `file-output` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>File-Output</code> node.</dd>

  <dt><b>Filename</b></dt>
  <dd>The name of the download file from the local page.</dd>

</dl>

## Data

The input `data` is passed directly into the download `Blob` and can have the following types:

```typescript
// input data type
data: ArrayBufferView | ArrayBuffer | Blob | string;
```
