import React from "react";
import "../StyleEverywhere/Stylish.css";
function MenuAcceuil() {

    return(
        
        <div className="ContainerMenuAcceuil">
            <h1>Menu</h1>
            <nav className="TableMenuAcceuil">
                <ol className="breadcrumb">
                    <li class="crumb"><a href="#home">Home</a></li>
                    <li class="crumb"><a href="#about">About</a></li>
                    <li class="crumb"><a href="#services">Services</a></li>
                    <li class="crumb"><a href="#contact">Contact</a></li>
                </ol>
            </nav>
        </div>
    )
}


export default MenuAcceuil;