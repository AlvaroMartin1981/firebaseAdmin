import React from 'react';

const Card = ({ product }) => {
    if (!product) {
        return <div>No product data available</div>;
    }

    return (
        <div className="product-card">
            {product.images?.large && <img src={product.images.large} alt={product.name} />}
            <h2>{product.name}</h2>
            <p>{product.flavorText}</p>
            {product.abilities && (
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
            )}
            {product.attacks && (
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
            )}
            {product.cardmarket?.prices && (
                <div>
                    <h3>Prices:</h3>
                    <ul>
                        <li>Average Sell Price: ${product.cardmarket.prices.averageSellPrice}</li>
                        <li>Low Price: ${product.cardmarket.prices.lowPrice}</li>
                    </ul>
                </div>
            )}
            {product.legalities && (
                <div>
                    <h3>Legalities:</h3>
                    <p>Unlimited: {product.legalities.unlimited}</p>
                </div>
            )}
            {product.tcgplayer?.prices?.holofoil && (
                <div>
                    <h3>TCGPlayer Prices:</h3>
                    <ul>
                        <li>Direct Low Price: ${product.tcgplayer.prices.holofoil.directLow}</li>
                        <li>Market Price: ${product.tcgplayer.prices.holofoil.market}</li>
                    </ul>
                </div>
            )}
            <div>
                <h3>Additional Details:</h3>
                <p>HP: {product.hp}</p>
                <p>Evolves From: {product.evolvesFrom}</p>
                <p>Rarity: {product.rarity}</p>
            </div>
        </div>
    );
}

export default Card;
