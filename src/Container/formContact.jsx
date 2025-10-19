import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../StyleEverywhere/Stylish.css";
import { useNavigate } from "react-router-dom";
function FormContact() {
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [resetClicked, setResetClicked] = React.useState(false);
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);
    function HandleChenges(e) {
        const {name, value} = e.target;
        e.target.style.color = "red";

        setTimeout(() => {
        e.target.style.color = "#e0e0e0"; // couleur d'origine
    }, 300);
        if (name === "nom") {
            setNom(value);
        } else if (name === "prenom") {
            setPrenom(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "message") {
            setMessage(value);
        }
}
    function handleSubmit(e) {
        
        e.preventDefault();
        setSubmitClicked(true);
        const audio2 = document.getElementById("clickSound2");
        const audio4 = document.getElementById("clickSound4");
        if (nom && prenom && email && message && submitClicked) {
            audio2.currentTime = 0; // remet au début du son
            audio2.play();
            alert(`Merci ${prenom} ${nom} pour votre message : "${message}". Nous vous contacterons bientôt à l'adresse ${email}.`);
            navigate("/");
        }else{
            audio4.currentTime = 5.2;
            audio4.play();
            setError(true);
            alert("Veuillez remplir tous les champs du formulaire avant de soumettre.");
            setError(false);
        }
    }
    function handleReset() {
        const audio3 = document.getElementById("clickSound3");
        if (audio3) {
         audio3.currentTime = 0; // remet au début du son
         audio3.play();
         setResetClicked(true)
         setTimeout(() => setResetClicked(false), 1000);
        }
       
       
         
    }
    useEffect(() => {
       const audio = document.getElementById("clickSound");
       
        if (audio) {
        audio.currentTime = 0; // remet au début du son
        audio.play();

        }
    }, [nom, prenom, email, message]);
    return(
        <div>
            <audio id="clickSound" src="/typewriter.mp3"  />
            <audio id="clickSound2" src="/roblox-old-winning-sound-effect.mp3"  />
            <audio id="clickSound3" src="/realy-nygga.mp3"  />
            <audio id="clickSound4" src="/hey-21.mp3"  />
            <h2>Formulaire de Contact</h2>
            <form method="Post" action={<Link to="/Acceuil" />}>
                <table border="1" className="TableauFormulaire">
                        <tr>
                            <th colSpan="2">
                                <label>Veuillez nous contacter ci-dessous</label>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <label>Nom :</label>
                            </td>
                            <td>
                                <input type="text" name="nom" onChange={HandleChenges} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Prénom :</label>
                            </td>
                            <td>
                                <input type="text" name="prenom" onChange={HandleChenges} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Email :</label>
                            </td>
                            <td>
                                <input type="email" name="email" onChange={HandleChenges} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Message :</label>
                            </td>
                            <td>
                                <textarea name="message" onChange={HandleChenges} rows="4" cols="30" required></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="reset" onClick={handleReset} value="Effacer" />
                            </td>
                            <td>
                                <input type="submit" onClick={handleSubmit} value="Envoyer" />
                            </td>
                        </tr>
                </table>
                {resetClicked && <img src="/giphy.gif" alt="Merci" style={{ width: "200px", textAlign: "center", left: "auto" }} />}
                {error && <img src="/giphysecond.gif" alt="Merci" style={{ width: "200px", textAlign: "center", left: "auto" }} />}
                </form>
        </div>
    )
}
export default FormContact;
