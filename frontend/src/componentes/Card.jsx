

const Card = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.images.large} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.flavorText}</p>
            <div>
                <h3>Abilities:</h3>
                <ul>
                    {product.abilities.map((ability, index) => (
                        <li key={index}>
                            <strong>{ability.name}</strong>: {ability.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Attacks:</h3>
                <ul>
                    {product.attacks.map((attack, index) => (
                        <li key={index}>
                            <strong>{attack.name}</strong>: {attack.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Prices:</h3>
                <ul>
                    <li>Average Sell Price: ${product.cardmarket.prices.averageSellPrice}</li>
                    <li>Low Price: ${product.cardmarket.prices.lowPrice}</li>
                    {/* Agrega más detalles de precios si es necesario */}
                </ul>
            </div>
            <div>
                <h3>Legalities:</h3>
                <p>Unlimited: {product.legalities.unlimited}</p>
                {/* Agrega más detalles de legalidades si es necesario */}
            </div>
            <div>
                <h3>TCGPlayer Prices:</h3>
                <ul>
                    <li>Direct Low Price: ${product.tcgplayer.prices.holofoil.directLow}</li>
                    <li>Market Price: ${product.tcgplayer.prices.holofoil.market}</li>
                    {/* Agrega más detalles de precios de TCGPlayer si es necesario */}
                </ul>
            </div>
            <div>
                <h3>Additional Details:</h3>
                <p>HP: {product.hp}</p>
                <p>Evolves From: {product.evolvesFrom}</p>
                <p>Rarity: {product.rarity}</p>
                {/* Agrega más detalles adicionales si es necesario */}
            </div>
        </div>
    );
}

export default Card;
