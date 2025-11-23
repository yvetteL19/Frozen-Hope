import { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import StartScreen from './components/StartScreen';
import CharacterSelect from './components/CharacterSelect';
import GamePlay from './components/GamePlay';
import EndingScreen from './components/EndingScreen';
import ReplayScreen from './components/ReplayScreen';
import AudioControl from './components/AudioControl';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider } from './i18n';

function AppContent() {
  const phase = useGameStore((state) => state.phase);
  const loadFromLocalStorage = useGameStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-gray-100">
      {/* 语言选择器 */}
      <LanguageSelector />
      {/* 音频控制按钮 */}
      <AudioControl />

      {phase === 'start' && <StartScreen />}
      {phase === 'character_select' && <CharacterSelect />}
      {(phase === 'act1' || phase === 'act2' || phase === 'act3') && <GamePlay />}
      {phase === 'ending' && <EndingScreen />}
      {phase === 'replay' && <ReplayScreen />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
