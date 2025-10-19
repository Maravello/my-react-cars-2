import React, { useRef, useEffect, useState } from "react";
import Acceuil from "./Pages/Acceuil";
import Contact from "./Pages/Contact";
import Apropos from "./Pages/Apropos";
import Voitures from "./Pages/Voiture";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./StyleEverywhere/Stylish.css";

function App() {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  const tracks = [
    { src: "/Sonic-Racing.mp3", name: "Sonic Racing 🎵" },
    { src: "/Sonic-Racing-Menu.mp3", name: "Sonic Racing Menu 🎶" },
    { src: "/Wonder-Museum.mp3", name: "Wonder Museum 🎵" },
    { src: "/All-I-need.mp3", name: "All I Need 🎶" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialisation AudioContext
  const setupAudioContext = () => {
    if (!audioCtxRef.current && audioRef.current) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    animationIdRef.current = requestAnimationFrame(animate);

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i];
      const r = barHeight + 25 * (i / dataArray.length);
      const g = 50 * (i / dataArray.length);
      const b = 200;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  };

  const playAudio = () => {
    if (!audioRef.current) return;
    setupAudioContext();
    audioRef.current.play().catch(() => {
      // Certains navigateurs demandent interaction utilisateur
      console.log("Play blocked until user interacts with page.");
    });
    setIsPlaying(true);
    animate();
  };

  const pauseAudio = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    changeTrack(tracks[next].src);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);
    changeTrack(tracks[prev].src);
  };

  const changeTrack = (src) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.load();
    audioRef.current.oncanplay = () => {
      audioRef.current.play();
      setIsPlaying(true);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />

      {/* Bandeau musique */}
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        <img
          src="/musicalnote1_83800.png"
          alt="music"
          style={{ width: "24px", height: "24px" }}
        />
        <span>{tracks[currentTrack].name}</span>
      </div>

      {/* Contrôles musique */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <button onClick={prevTrack}>⏮️ Prev</button>
        {isPlaying ? (
          <button onClick={pauseAudio}>⏸️ Pause</button>
        ) : (
          <button onClick={playAudio}>▶️ Play</button>
        )}
        <button onClick={nextTrack}>⏭️ Next</button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/Voiture" element={<Voitures />} />
        </Routes>
      </BrowserRouter>

      <audio ref={audioRef} crossOrigin="anonymous" />
    </div>
  );
}

export default App;
