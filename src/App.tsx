import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'SpectrumVisualizer';

// const Box = () => {
//   const { analyser } = useAudioVisualizerContext();

//   console.log('audio context:', analyser);
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={'hotpink'} />
//     </mesh>
//   );
// };

function App() {
  return (
    <div>
      <SpectrumVisualizer
        audio="https://media1.vocaroo.com/mp3/111ewAKiEfXZ"
        theme={SpectrumVisualizerTheme.roundBars}
        color={0xff9633}
      />
    </div>
  );
}

export default App;
