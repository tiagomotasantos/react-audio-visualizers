import { AudioVisualizer } from 'packages/react-audio-visualizers-core/src';

function App() {
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
