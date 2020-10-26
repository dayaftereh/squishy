# Script

The script node allows to execute `Javascript` and give the powerful option to write **glue code** for transforming data from one node to the other. 
The **javascript** is executed inside the [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), which gives some limitations.
The script node can have multiply incoming connections from other nodes.
Each incoming connection can have a *name*, which is later available as `variable` with the given name inside the **javascript** code.
The **javascript** needs to end alway with a ```return``` of some data. 
However, the script node allows to return a `Promise` for **async** implementations.

The following script node shows a small example.

<p align="center">
    <img alt="Script" src="./assets/documentation/png/script.png">
</p>

Inside the script node the two variables `input1` and `input2` can be used.
Checkout the code snippet below.

```javascript
const x = input1 + input2
return x
```

The snippet returns the sum of ``input1`` and ``input2``.

## Properties

Following `script` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>Script</code> node.</dd>
</dl>

## Extensions

The script node is the main feature of *squishy*, because it is so powerful for connection one node with each other. 
However, the script node comes with same additional extensions and libraries to make *squishy* more flexible.
Currently there are three additional variables passed to the **javascript** code execution:

  * [Mathf](/documentation/script/mathf) a extended math library
  * [Squishy](/documentation/script/squishy) access to internal execution and *squishy* types
  * [Plugins](/documentation/script/plugins) additional **javascript** libraries

Each additional variable can be explored directly inside the **javascript** editor via the autocomplete (*STRG*+*Space*).
If more **javascript** libraries required, checkout the option to use `importScripts()` inside the [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

