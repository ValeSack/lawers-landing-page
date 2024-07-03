import { useState } from "react";
import "../css/Carousel.css";

const Carousel = ({ agents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % agents.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + agents.length) % agents.length
    );
  };

  const generateWhatsAppMessage = (agent) => {
    const phoneNumber = agent.whatsappNumber;
    const message = encodeURIComponent(
      "Hola, estoy interesado en sus servicios."
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    return url;
  };

  const handleWhatsApp = (agent) => {
    const whatsappUrl = generateWhatsAppMessage(agent);
    console.log("Opening WhatsApp URL:", whatsappUrl);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="car-container">
      <div className="carousel-container">
        <button className="carousel-prev" onClick={prevSlide}>
          &#10094;
        </button>
        {agents.map((agent) => (
          <div
            className={`carousel-slide ${
              agent.id === currentIndex + 1 ? "active" : ""
            }`}
            key={agent.id}
          >
            <img src={agent.image} alt={agent.name} className="agent-image" />
            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p>{agent.profession}</p>
            </div>
          </div>
        ))}
        <button className="carousel-next" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="carousel-line"></div>
      </div>
      {agents.map((agent) => (
        <div
          className={`carousel-button ${
            agent.id === currentIndex + 1 ? "active" : ""
          }`}
          key={agent.id}
        >
          <button
            className="whatsapp-button"
            onClick={() => handleWhatsApp(agent)}
          >
            Contactar por WhatsApp
          </button>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
