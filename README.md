<h1 align="center">React Audio Visualizers</h1>

<div align="center">

A library of audio visualizer components for [React](https://facebook.github.io/react/) built with [ThreeJS](https://threejs.org/), through [react-three-fiber](https://github.com/pmndrs/react-three-fiber), and the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE.md)
[![npm latest package](https://img.shields.io/npm/v/react-audio-visualizers/latest.svg)](https://www.npmjs.com/package/react-audio-visualizers)

</div>

## Installation

React-audio-visualizers is available as an [npm package](https://www.npmjs.com/package/react-audio-visualizers).

```sh
npm install react-audio-visualizers
#or
yarn add react-audio-visualizers
```

## Usage

Here is an example of how to use a visualizer from react-audio-visualizers:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

function App() {
  return (
    <SpectrumVisualizer
        audio="https://your.domain.com/yourAudioFile.mp3"
        theme={SpectrumVisualizerTheme.radialSquaredBars}
        colors={['#009688', '#26a69a']}
        iconsColor="#26a69a"
        backgroundColor="white"
        showMainActionIcon
        showLoaderIcon
        highFrequency={8000}
    />
  );
}

ReactDOM.render(<App />, document.querySelector('root'));
```
## Demos

Take a look at some [demos](https://demo-react-audio-visualizers.vercel.app/) to see what the visualizers look like.

## Documentation

Check out the [documentation website](https://docs-react-audio-visualizers.vercel.app/GettingStarted.html).

## License

This project is licensed under the terms of the
[MIT license](/LICENSE.md).
