import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InputArea from './components/InputArea/InputArea';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import EmptyState from './components/EmptyState/EmptyState';
import StudyMaterialView from './components/StudyMaterial/StudyMaterialView';
import useStudyMaterial from './hooks/useStudyMaterial';
import './App.css';

function App() {
  const { status, data, error, lastInput, generate, reset } = useStudyMaterial();
  console.log("App rendered, status:", status);

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return <EmptyState />;
      case 'loading':
        return <Loader />;
      case 'error':
        return <ErrorMessage message={error} onRetry={() => generate(lastInput)} />;
      case 'success':
        return <StudyMaterialView data={data} onRestart={reset} lastInput={lastInput} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      
      {/* Hide Hero if we are in success state to give more room for learning */}
      {status !== 'success' && <Hero />}
      
      <main style={{ padding: '0 1rem', paddingBottom: '4rem' }}>
        {status !== 'success' && (
          <InputArea 
            onGenerate={generate} 
            isLoading={status === 'loading'} 
          />
        )}
        
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
