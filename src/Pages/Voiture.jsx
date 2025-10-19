import React,{useState, useEffect}from "react";
import MenuAcceuil from "../Container/menuAcceuil";
import "../StyleEverywhere/Stylish.css";
function Voitures() {
    const [hovered, setHovered] = useState(false);
    const [hoveredSecond, setSecondHovered] = useState(false);

    useEffect(() => {
        const button = document.querySelector('.ButtonVoitures');
        const button2 = document.querySelector('.ButtonVoitures2');
        if(hovered){
            button.style.color = '#ffcc00'; // Change to desired hover color
        }else{
            button.style.color = ''; // Reset to default color
        }
        if(hoveredSecond){
            button2.style.color = '#ffcc00'; // Change to desired hover color
        }else{
            button2.style.color = ''; // Reset to default color
        }
    }, [hovered, hoveredSecond]);

    return(
        <div className="voiture-container" style={{margin: "auto"}}>
            <MenuAcceuil />
                <table border="1" className="TableMenuVoiture">
                    <tr>
                        <td className="tdVoiture">
                            <button className="ButtonVoitures" onMouseEnter={() =>setHovered(true)} onMouseLeave={() =>setHovered(false)}>Déposer une voitures</button>
                        </td>
                        <td className="tdVoiture">
                            <button className="ButtonVoitures2" onMouseEnter={() =>setSecondHovered(true)} onMouseLeave={() =>setSecondHovered(false)}>Voir les voitures déposées</button>
                        </td>
                    </tr>
                </table>
                {hovered && <img style={{marginLeft: "250px"}} src="/sonic.gif" alt="Car Icon" />}
                {hoveredSecond && <img style={{marginLeft: "250px"}} src="/NFS.gif" alt="Car Icon" />}
        </div>
    )
}

export default Voitures;