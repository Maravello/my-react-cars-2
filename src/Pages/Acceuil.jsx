import React, { useEffect, useState } from "react";
import MenuAcceuil from "../Container/menuAcceuil";
import "../StyleEverywhere/Stylish.css";

function Acceuil() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/voiture/voitures');
                if (!response.ok) throw new Error('API non disponible');
                
                const data = await response.json();
                setCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div>🔄 Chargement...</div>;
    if (error) return <div>❌ Erreur: {error}</div>;

    return (
        <div className="ContainerMenuAcceuil">
            <MenuAcceuil />
            <h1>🏎️ Notre Collection de Voitures</h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '20px',
                width: '100%'
            }}>
                {cars.map((car) => (
                    <div key={car.id} className="divCars">
                        {/* Badge premium */}
                        <div className="car-badge">PREMIUM</div>
                        
                        {/* Titre */}
                        <h3 className="car-title">{car.marque} {car.modele}</h3>
                        
                        {/* Informations */}
                        <div className="car-info">
                            <div className="info-line">
                                <span className="info-icon">🆔</span>
                                <div className="info-text">
                                    <div className="info-label">Identifiant</div>
                                    <div className="info-value">{car.id}</div>
                                </div>
                            </div>
                            
                            <div className="info-line">
                                <span className="info-icon">🚗</span>
                                <div className="info-text">
                                    <div className="info-label">Immatriculation</div>
                                    <div className="info-value">{car.immatriculation || 'Non spécifiée'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Acceuil;