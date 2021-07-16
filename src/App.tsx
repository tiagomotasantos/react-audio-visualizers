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
    <div style={{ height: '100%' }}>
      <SpectrumVisualizer
        audio="https://media1.vocaroo.com/mp3/13HVOqUk0kGc"
        theme={SpectrumVisualizerTheme.roundBars}
        color={0xff9670}
        iconsColor="#ff9670"
        showMainActionIcon
      />
    </div>
  );
}

export default App;
