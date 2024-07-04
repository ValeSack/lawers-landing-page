import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "../css/Correo.css";

export const SendCorreo = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    if (setShowAlert) {
      const timer = setTimeout(() => {
        setShowAlert(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  function sendEmail(e) {
    e.preventDefault();

    if (name === "" || tel === "" || email === "" || message === "") {
      setShowAlert({
        type: "error",
        message: "Complete todos los campos requeridos.",
      });
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      tel: tel,
      email: email,
    };

    emailjs
      .send(
        "service_9tcxkrp",
        "template_evjrtyp",
        templateParams,
        "qm_mpDDeD4fmo76dD"
      )
      .then(
        (response) => {
          console.log("email enviado", response.status, response.text);
          setName("");
          setTel("");
          setEmail("");
          setMessage("");
          setShowAlert({
            type: "success",
            message: "Correo enviado exitosamente.",
          });
        },
        (err) => {
          console.log("ERROR: ", err);
          setShowAlert({
            type: "error",
            message: "Error al enviar el correo.",
          });
        }
      );
  }

  return (
    <div className="cor-container">
      <div className="alert-container">
        {showAlert && (
          <div
            className={`alert ${
              showAlert.type === "error" ? "alert-error" : "alert-success"
            }`}
          >
            {showAlert.message}
          </div>
        )}
      </div>
      <div className="correo-contacto">
        <div className="correo-podemos">
          <h3 className="correo-title">
            Podemos <br />
            ayudarte.
          </h3>
          <p className="correo-parrafo">
            Envíenos un mensaje contándonos cómo podemos ayudarle o hable con
            nosotros directamente por WhatsApp.
          </p>
          <p className="correo-parrafo">
            Le garantizamos que nuestro equipo le responderá lo antes posible.
          </p>
        </div>
        <div className="correo-contacto2">
          <h4 className="correo-title2">
            Si prefiere, mándenos un correo con sus datos.
          </h4>
          <form className="form" onSubmit={sendEmail}>
            <input
              required
              type="text"
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="tel"
              value={tel}
              placeholder="Teléfono, solo numeros"
              inputMode="numeric"
              onChange={(e) => setTel(e.target.value)}
              pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
              maxLength="10"
              required
            />
            <input
              required
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              required
              className="textarea"
              placeholder="Escribe con qué área quiere contactar, derecho o contabilidad. Puede agregar un poco de información adicional sobre su caso."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="correo-enviar">
              <button type="submit">Enviar correo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
