# Text-Input

The text input node allows to enter text content into a textarea at the **executor** page. 
The content can be `plain/text` or `application/json`.
If the content type is `application/json` the text input node converts the *json* to an `Object` by using `JSON.parse` before forwarding the returned data to the next node.

<p align="center">
    <img alt="Text-Input" src="./assets/documentation/png/text-input.png">
</p>

## Properties

Following `text-input` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>Text-Input</code> node.</dd>

  <dt><b>Type</b></dt>
  <dd>
    The content type for the textarea. Default is <code>plaintext</code>.
    <ul>
        <li><b>plaintext</b> normal text content</li>
        <li><b>json</b> the content get interpreted as json and the return data is a <code>Object</code> because of the usage from <code>JSON.parse</code>.</li>
    </ul>
  </dd>

</dl>

## Data

The type definition of the return data from the `Text-Input` are:

```typescript
// if type is plain/text
data: string
// if type is application/json
data: any
```