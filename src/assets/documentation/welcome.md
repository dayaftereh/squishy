<h1 align="center">Squishy</h1>

<p align="center">
    An in browser data <b>transformer</b> and <b>visualizer</b>.    
</p>
<p align="center">
    <img alt="Squishy" src="./assets/documentation/png/squishy-editor.png">
</p>

## Introduction

Squishy is a cross platform data transformer and visualizer for the browser.
It's designed to be used without any installation.

The main concept of squishy is to combine different types of nodes to build up the required transformation pipeline.
The **visual programming editor** allows to simple connect the nodes in the correct order and tells squishy how to execute the pipeline from start to the end.

So far squishy comes with six nodes:

 * [File-Input](documentation/file-input) allows to load data from local *file-system*.
 * [Text-Input]() allows to define a textarea for text or `json` input.
 * [File-Output]() allows to export generated data.
 * [Script]() allows to write [Javascript](https://en.wikipedia.org/wiki/JavaScript) code, which is then executed inside the pipeline.
 * [Chart]() allows to visualized **2D** data with a *chart*.
 * [View3D]() allows to visualized **3D** data with a *3D-Scene*.

Checkout the documentation for each node to find out how it works.

## Execution

Squishy is not only a **visual programming editor** with it own nodes. 
It's also allows to execute the programmed and configured project.
The project is moved to a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) context and the web-worker is executing the configured pipeline.
This decapsulate the execution from the `main` line allows to cancel the execution if needed.

## Get-Started

To get started checkout the example projects and the [Get-Started]() tutorial.