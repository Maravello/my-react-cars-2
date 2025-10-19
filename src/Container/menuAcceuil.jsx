import React from "react";
import { Link } from "react-router-dom";
import "../StyleEverywhere/Stylish.css";
function MenuAcceuil() {

    return(
        
        <div className="ContainerMenuAcceuil">
            <h1>Menu</h1>
            <nav className="TableMenuAcceuil">
                <ol className="breadcrumb">
                    <li class="crumb"><button><Link to="/">Home</Link></button></li>
                    <li class="crumb"><a href="#about"><button>About</button></a></li>
                    <li class="crumb"><button><Link to="/apropos">Services</Link></button></li>
                    <li class="crumb"><button><Link to="/Contact"> Contact</Link></button></li>
                </ol>
            </nav>
        </div>
    )
}


export default MenuAcceuil;