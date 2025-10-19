import React, { useEffect, useRef, useState } from "react";
import "../StyleEverywhere/Stylish.css";
import MenuAcceuil from "../Container/menuAcceuil";

function Apropos() {
    const [showMore, setShowMore] = useState(false);
    const confettiRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key.toLowerCase() === "f") launchConfetti(40);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    function launchConfetti(amount = 30) {
        const container = confettiRef.current;
        if (!container) return;
        for (let i = 0; i < amount; i++) {
            const el = document.createElement("span");
            el.className = "confetti-piece";
            const size = Math.random() * 10 + 6;
            el.style.width = `${size}px`;
            el.style.height = `${size * 0.6}px`;
            el.style.left = `${Math.random() * 100}%`;
            el.style.background = `hsl(${Math.random() * 360} 80% 60%)`;
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(el);
            // suppression après animation
            setTimeout(() => el.remove(), 5000 + Math.random() * 2000);
        }
    }

    function playEngineSound(duration = 1000) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = "sawtooth";
            o.frequency.setValueAtTime(120, ctx.currentTime);
            o.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration / 1500);
            g.gain.setValueAtTime(0.0001, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
            o.connect(g);
            g.connect(ctx.destination);
            o.start();
            setTimeout(() => {
                o.stop();
                ctx.close();
            }, duration);
        } catch (e) {
            // pas d'AudioContext (vieil environnement) -> silence
        }
    }

    return(
        <div className="apropos-container">
            <MenuAcceuil />
            <h1 className="Title-a-propos interactive-title"
                onClick={() => launchConfetti(25)}
                title="Clique pour lancer des confettis">
                À Propos de Nous
            </h1>

            <div className="fun-row">
                <div className="car-emoji" role="button" tabIndex={0}
                     onClick={() => { playEngineSound(1200); launchConfetti(18); }}
                     onKeyDown={(e) => { if (e.key === "Enter") { playEngineSound(1200); launchConfetti(18); } }}
                >
                    🚗
                </div>

                <div className="fun-controls">
                    <button className="btn" onClick={() => launchConfetti(60)}>Fêter 🎉</button>
                    <button className="btn" onClick={() => playEngineSound(1500)}>Moteur 🔊</button>
                    <button className="btn" onClick={() => setShowMore(s => !s)}>{showMore ? "Moins" : "Plus"} ℹ️</button>
                </div>
            </div>

            <div className={`a-propos ${showMore ? "expanded" : "collapsed"}`}>
                <p>Bienvenue sur notre site de voitures ! Nous sommes passionnés par les voitures et nous nous efforçons de vous offrir la meilleure expérience possible.</p>
                <p>Notre équipe est dédiée à fournir des informations précises et à jour sur les dernières tendances automobiles, les modèles populaires, et bien plus encore.</p>
                <p>Merci de visiter notre site et n'hésitez pas à nous contacter pour toute question ou suggestion.</p>

                <div className="apropos-grid">
                    <div className="event-card" onMouseEnter={(e)=> e.currentTarget.classList.add("pulse")} onMouseLeave={(e)=> e.currentTarget.classList.remove("pulse")}>
                        <h3>Rencontres auto</h3>
                        <p>On organise des meetups mensuels — clique sur "Fêter" pour t'imaginer sur place.</p>
                    </div>
                    <div className="event-card">
                        <h3>Galerie fun</h3>
                        <p>Des photos, des GIFs, et des petits jeux autour des voitures.</p>
                    </div>
                </div>
            </div>

            <div ref={confettiRef} className="confetti-root" aria-hidden="true"></div>
        </div>
    )
}

export default Apropos;