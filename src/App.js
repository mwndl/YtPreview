import React, { useEffect, useState } from 'react';
import YouTubeEmbed from './components/YouTubeVideo/index';
import './App.css';

function App() {
  const [params, setParams] = useState({
    videoId: '',
    showPlayPauseBtn: true,
    showProgressBar: true,
    showMuteBtn: true,
    fullScreen: true,
    repeat: true,
    autoStart: true,
    start: 0,
    end: 0
  });
  const [error, setError] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [showParameters, setShowParameters] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');

    if (!videoId) {
      setError('Erro: Parâmetros obrigatórios ausentes!');
      return;
    }

    const showPlayPauseBtn = urlParams.get('showPlayPauseBtn') === 'true' || true;
    const showProgressBar = urlParams.get('showProgressBar') === 'true' || true;
    const showMuteBtn = urlParams.get('showMuteBtn') === 'true' || true;
    const fullScreen = urlParams.get('fullScreen') === 'true' || true;
    const repeat = urlParams.get('repeat') === 'true' || true;
    const autoStart = urlParams.get('autoStart') === 'true' || true;
    const start = urlParams.get('start') ? parseInt(urlParams.get('start')) : 0;
    const end = urlParams.get('end') ? parseInt(urlParams.get('end')) : 0;

    const currentBaseUrl = window.location.origin;

    setBaseUrl(currentBaseUrl);

    setParams({
      videoId,
      showPlayPauseBtn,
      showProgressBar,
      showMuteBtn,
      fullScreen,
      repeat,
      autoStart,
      start,
      end
    });
  }, []);

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <h1 className="error-title">Erro: Parâmetro obrigatório ausente</h1>
          <p className="error-description">
            O parâmetro "<strong>id</strong>" é obrigatório para carregar o vídeo. Para corrigir o erro, adicione o parâmetro à URL.
          </p>
          <p className="error-instruction">
            Exemplo de URL correta:
          </p>
          <pre className="error-example">
            {baseUrl}?id=ID_DO_VIDEO
          </pre>
          <p className="error-instruction">
            Substitua <strong>ID_DO_VIDEO</strong> pelo ID real do vídeo do YouTube.
          </p>
          <div className="parameters-list">
            <h3>Parâmetros suportados</h3>
            <ul>
              <li><strong>id</strong>: ID do vídeo do YouTube (obrigatório)</li>
              <li><strong>showPlayPauseBtn</strong>: Exibe o botão de Play/Pause (opcional, padrão: true)</li>
              <li><strong>showProgressBar</strong>: Exibe a barra de progresso (opcional, padrão: true)</li>
              <li><strong>showMuteBtn</strong>: Exibe o botão de Mudo (opcional, padrão: true)</li>
              <li><strong>fullScreen</strong>: Permite exibir o vídeo em tela cheia (opcional, padrão: true)</li>
              <li><strong>repeat</strong>: Habilita o loop do vídeo (opcional, padrão: true)</li>
              <li><strong>autoStart</strong>: Inicia automaticamente o vídeo (opcional, padrão: true)</li>
              <li><strong>start</strong>: Tempo inicial em segundos para começar o vídeo (opcional)</li>
              <li><strong>end</strong>: Tempo final em segundos para terminar o vídeo (opcional)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className='ytContainer'>
        {/* Renderize o componente YouTubeEmbed apenas se videoId estiver presente */}
        {params.videoId && (
          <YouTubeEmbed
            videoId={params.videoId}
            showPlayPauseBtn={params.showPlayPauseBtn}
            showInicialOverlay={true} // Sempre true
            showProgressBar={params.showProgressBar}
            showMuteBtn={params.showMuteBtn}
            fullScreen={params.fullScreen}
            repeat={params.repeat}
            autoStart={params.autoStart}
            start={params.start}
            end={params.end}
            playerId="unique-player-id"  // Adicionando um ID único para o player
          />
        )}
      </div>
    </div>
  );
}

export default App;
