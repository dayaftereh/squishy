# Chart

The chart node allows to visualize **2d** data inside a chart. 
The chart is implemented with [Chart.js](https://www.chartjs.org/) and allows to pass *datasets* with `x` and `y` values.
Each node connection represents a *dataset*, which is later displayed under the given name.

<p align="center">
    <img alt="Chart" src="./assets/documentation/png/chart.png">
</p>

## Properties

Following `chart` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>Chart</code> node.</dd>

  <dt><b>Animation</b></dt>
  <dd>if check, the chart is animated, uncheck to improve the performance.</dd>

  <dt><b>Pan</b></dt>
  <dd>enables or disables the <b>pan</b> option for the chart.</dd>

  <dt><b>Zoom</b></dt>
  <dd>enables or disables the <b>zoom</b> option for the chart.</dd>

  <dt><b>Tooltip Fraction</b></dt>
  <dd>the <b>precision</b> of the tooltip values [0, 20].</dd>

  <dt><b>Line Tension</b></dt>
  <dd>The <i>bezier curve</i> tension of the line. Set to <code>0</code> to draw straightlines.</dd>
</dl>

## Dataset-Properties

Following `dataset` properties can be set:

<dl>
  <dt><b>Name</b></dt>
  <dd>The name of the <code>dataset</code>.</dd>

  <dt><b>Color</b></dt>
  <dd>The color of the <i>points</i> and <i>lines</i> for the dataset.</dd>

  <dt><b>Show Lines</b></dt>
  <dd>If false, the line is not drawn for this dataset.</dd>

  <dt><b>Fill</b></dt>
  <dd>If true, a area between two datasets or a dataset and a boundary is created.</dd>

</dl>

## Dataset Data

The **dataset** `data` needs to be passed as the following:

```typescript
// type definition of data
data: {x: number, y: number}[]
// example for the dataset data
const data = [
    {
        x: 1.4,
        y: 5.3
    },
    {
        x: 32,
        y: 0
    }
    //...
]
// the data can also a list of Vec2 or Vec3 from Mathf
const data = [
    new Mathf.Vec2(1.0, 3.2),
    new Mathf.Vec2(19.0, 2),
]
```