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
        volume={1}
        theme={SpectrumVisualizerTheme.squaredBars}
        colors={['#ff9670', '#b2694e']}
        iconsColor="#ff9670"
        backgroundColor="black"
        showMainActionIcon
        showLoaderIcon
      />
    </div>
  );
}

export default App;
