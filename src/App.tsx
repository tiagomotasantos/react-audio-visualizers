// import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'SpectrumVisualizer';
import { WaveformVisualizer, WaveformVisualizerTheme } from 'WaveformVisualizer';

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
      {/* <SpectrumVisualizer
        audio="https://media1.vocaroo.com/mp3/13HVOqUk0kGc"
        volume={1}
        theme={SpectrumVisualizerTheme.radialSquaredBars}
        colors={['#009688', '#26a69a']}
        iconsColor="#26a69a"
        backgroundColor="white"
        showMainActionIcon
        showLoaderIcon
        highFrequency={8000}
      /> */}
      <WaveformVisualizer
        audio="https://media1.vocaroo.com/mp3/13HVOqUk0kGc"
        volume={1}
        theme={WaveformVisualizerTheme.squaredBars}
        colors={['#26a69a', '#004d40']}
        iconsColor="#26a69a"
        backgroundColor="black"
        showMainActionIcon
        showLoaderIcon
      />
    </div>
  );
}

export default App;
