import { AudioVisualizer, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';

function App() {
  const { analyser } = useAudioVisualizerContext();

  console.log('audio context:', analyser);
  return (
    <div>
      <AudioVisualizer audio="https://media1.vocaroo.com/mp3/111ewAKiEfXZ">
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'hotpink'} />
        </mesh>
      </AudioVisualizer>
    </div>
  );
}

export default App;
