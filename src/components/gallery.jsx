import React, { useState } from "react";

export const Gallery = (props) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (game) => {
    // Aquí puedes agregar la lógica para agregar el juego al carrito
    console.log(`Agregado al carrito: ${game.title}, Cantidad: ${quantity}`);
    setSelectedGame(null); // Cerrar el apartado después de agregar al carrito
  };

  return (
    <div id="portfolio" className="text-center">
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
                  >
                    <div className="portfolio-item">
                      <div onClick={() => setSelectedGame(d)}>
                        <img
                          src={d.smallImage}
                          alt={d.title}
                          className="img-responsive"
                        />
                      </div>
                      {selectedGame && selectedGame.title === d.title && (
                        <div className="add-to-cart">
                          <h3>{d.title}</h3>
                          <p>{d.description}</p>
                          <p><strong>Precio:</strong> {d.price}</p>
                          <label>
                            Cantidad:
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              min="1"
                            />
                          </label>
                          <button onClick={() => handleAddToCart(d)}>
                            Agregar al carrito
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
