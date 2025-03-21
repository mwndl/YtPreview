import React, { useState, useEffect } from 'react';
import YouTubeEmbed from 'yt-custom-player';
import './App.css';

function App() {
  const [params, setParams] = useState({
    videoId: '',
    showPlayPauseBtn: true,
    showProgressBar: true,
    showMuteBtn: true,
    fullScreen: true,
    repeat: true,
    autoplay: true,
    start: 0,
    end: 0,
  });
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light'); // Adiciona o estado para o tema

  // Função para detectar tema do navegador
  const detectBrowserTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Verifica o parâmetro de URL e ajusta o tema
  const checkThemeFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
      setTheme(themeParam);
    } else {
      setTheme(detectBrowserTheme());
    }
  };

  // Verifica o parâmetro de URL e ajusta os parâmetros do vídeo
  const checkParamsFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id'); // Verifica o ID do vídeo
    const autoplay = urlParams.has('autoplay') ? urlParams.get('autoplay') === 'true' : true;
    const repeat = urlParams.has('repeat') ? urlParams.get('repeat') === 'true' : true;
    const showPlayPauseBtn = urlParams.has('showPlayPauseBtn') ? urlParams.get('showPlayPauseBtn') === 'true' : true;
    const showProgressBar = urlParams.has('showProgressBar') ? urlParams.get('showProgressBar') === 'true' : true;
    const showMuteBtn = urlParams.has('showMuteBtn') ? urlParams.get('showMuteBtn') === 'true' : true;
    const fullScreen = urlParams.has('fullScreen') ? urlParams.get('fullScreen') === 'true' : true;
    const start = urlParams.has('start') ? parseInt(urlParams.get('start')) : 0;
    const end = urlParams.has('end') ? parseInt(urlParams.get('end')) : 0;

    // Atualiza os parâmetros do vídeo
    if (videoId) {
      setParams({
        videoId,
        autoplay,
        repeat,
        showPlayPauseBtn,
        showProgressBar,
        showMuteBtn,
        fullScreen,
        start,
        end,
      });
    }
  };

  useEffect(() => {
    checkThemeFromUrl();
    checkParamsFromUrl(); // Verifica os parâmetros da URL e ajusta os valores
  }, []);

  // Extração do ID do vídeo do YouTube via regex
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+\?v=)|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Atualiza o valor da input de texto
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Lida com o envio de busca
  const handleSearch = () => {
    const videoId = extractVideoId(inputValue);
    if (!videoId) {
      setError('Erro: URL do YouTube inválida!');
      return;
    }

    // Atualiza os parâmetros com o ID extraído
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('id', videoId); // Adiciona o ID na URL
    window.history.pushState(null, '', '?' + urlParams.toString()); // Atualiza a URL sem recarregar a página

    // Define os parâmetros do vídeo
    setParams({
      videoId,
      showPlayPauseBtn: true,
      showProgressBar: true,
      showMuteBtn: true,
      fullScreen: true,
      repeat: true,
      autoplay: true,
      start: 0,
      end: 0,
    });
    setError('');
    
    // Limpa o campo de entrada
    setInputValue('');
  };

  // Lida com o pressionamento da tecla Enter para enviar a busca
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Aplica a classe do tema no corpo do documento
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Cole o link do YouTube aqui"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Permite pressionar Enter para buscar
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      )}

      <div className="ytContainer">
        {params.videoId && (
          <YouTubeEmbed
            videoId={params.videoId}
            showPlayPauseBtn={params.showPlayPauseBtn}
            showInicialOverlay={true} // Sempre true
            showProgressBar={params.showProgressBar}
            showMuteBtn={params.showMuteBtn}
            fullScreen={params.fullScreen}
            repeat={params.repeat}
            autoplay={params.autoplay}
            start={params.start}
            end={params.end}
            playerId="unique-player-id"  // ID único para o player
          />
        )}
      </div>
    </div>
  );
}

export default App;
