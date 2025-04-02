import React, { useState, useRef, useEffect } from "react";
import "./gallery.css"; // Asegúrate de importar el archivo CSS
import data from "../data/data.json";

export const App = () => {
  return <Gallery data={data.Gallery} />;
};

export const Gallery = (props) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [highlightedGame, setHighlightedGame] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reinicia el video cuando cambia el estado
    }
  }, [highlightedGame]);

  const handleAddToCart = (game) => {
    console.log(`Agregado al carrito: ${game.title}, Cantidad: ${quantity}`);
    const audio = new Audio("/sounds/congratulations.mp3"); // Ruta del archivo de sonido
    audio.play(); // Reproduce el sonido
    setConfirmationMessage(true);
    setTimeout(() => setConfirmationMessage(false), 3000); // Oculta el mensaje después de 3 segundos
    setSelectedGame(null); // Cierra el modal
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedGame(null);
      setIsClosing(false);
    }, 500); // Duración de la animación
  };

  return (
    <div id="portfolio" className="text-center">
      {/* Fondo del video */}
      {highlightedGame && (
        <div className="video-background">
          <video ref={videoRef} autoPlay muted loop>
            <source src={highlightedGame.trailer} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      )}

      <div className="container">
        <div className="section-title">
          <h2>Tienda de juegos</h2>
          <p>
            Descubre imágenes exclusivas, trailers y capturas de nuestros videojuegos destacados
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                    onMouseEnter={() => setHighlightedGame(d)} // Cambia el video al pasar el mouse
                    onMouseLeave={() => setHighlightedGame(null)} // Limpia el video al salir
                  >
                    <div className="portfolio-item">
                      <div className="image-container" onClick={() => setSelectedGame(d)}>
                        <img
                          src={d.smallImage}
                          alt={d.title}
                          className="img-responsive"
                        />
                        <div className="overlay">
                          <div className="text">{d.title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>

      {/* Modal para comprar el juego */}
      {selectedGame && (
        <div className={`modal-overlay ${isClosing ? "closing" : ""}`}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              ✕
            </button>
            <h3>{selectedGame.title}</h3>
            <p>{selectedGame.description}</p>
            <p><strong>Precio:</strong> {selectedGame.price}</p>
            <label>
              Cantidad:
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </label>
            <button data-tooltip="Agregar este producto al carrito" onClick={() => handleAddToCart(selectedGame)}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de confirmación */}
      {confirmationMessage && (
        <div className="confirmation-message">
          ¡Producto agregado al carrito con éxito!
        </div>
      )}

      {/* Botón para volver al inicio */}
      <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑
      </button>
    </div>
  );
};
