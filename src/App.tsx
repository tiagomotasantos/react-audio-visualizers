import { AudioVisualizer, useAudioVisualizerContext } from 'packages/react-audio-visualizers-core/src';

const Box = () => {
  const { analyser } = useAudioVisualizerContext();

  console.log('audio context:', analyser);
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
};


function App() {
  return (
    <div>
      <AudioVisualizer audio="https://media1.vocaroo.com/mp3/111ewAKiEfXZ">
        <Box/>
      </AudioVisualizer>
    </div>
  );
}

export default App;
