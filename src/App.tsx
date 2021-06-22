import { AudioVisualizer } from 'react-audio-visualizers-core';

function App() {
  return (
    <div>
      <AudioVisualizer audio="https://media1.vocaroo.com/mp3/111ewAKiEfXZ">
        <div>RENDER</div>
      </AudioVisualizer>
    </div>
  );
}

export default App;
