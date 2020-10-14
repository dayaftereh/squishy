# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] // 0.1.5

### Added

 - `Color` class to `Mathf` to work with RGBA colors
 - `Chart` node to display output in `chart.js`
 - `Squishy.io.xmlParse` to parse xml with `xmldom`
 - `GlobalErrorHandle` to handle uncatched errors
 - `View3D` node to display 3D output with `three.js` and add `Squishy.view3d` to created 3d objects
 - examples for `View3D`, `Chart`, `Input & Output` and `BSpline3`
 - example for `pngjs`
 - `Curve`, `Spline` and `Ellipse` to script node
 - `xmldom`, `pngjs` and `buffer` to `Plugins`
 
### Changed

 - `SquishyIO.csvStringify` to pass a `toString` function 
 - updated some dependencies

### Removed

 - `Squishy.io.xmlParse`, because `xmldom` now under `Plugins`

### Fixed
 
 - issue with upload old projects and version compare

## 0.1.3 - 24.09.2020

### Added
 
 - `Mathf` to script context
 - `Squishy` to script context
 - `Plugins` to script context
 - documentation based on `markdown` files
 - `Text-Input` as no node component
 - `scripts.d.ts` for auto-compilation in `Script` block

### Changed

 - update to angular `10.x`
 - updated some dependencies
 - some documentation

### Fixed

 - issue with `ErrorManager` and `p-toast` from new **PrimeNG**
 - issue with tables and `ContextMenu` not opens
 - issue with `FileInput` and multiply

## 0.1.1 - 02.06.2020

### Changed

 - using `Worker.terminate()` to cancel running execution immediately

### Added

 - `I18n` for english
 - projects now stored in `localStorage`
 - `ExecuteDialog` for execution status, progress and cancel
 - `maximize` to properties and script editor dialog
 - `error-manager` for execution exceptions

## 0.1.0

 - First Version