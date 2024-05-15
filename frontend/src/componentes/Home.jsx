import Card from "./Card";

const Home = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">About us</a></li>
                    </ul>
                </nav>
                <div>
                    <input type="text" placeholder="Search..." />
                    <button>Sign in</button>
                    <button>Sign up</button>
                </div>
            </header>
            <main>
                {/* Renderizar las tarjetas de productos aquí */}
                <Card />
            </main>
            <footer>
                <p>Footer content goes here</p>
            </footer>
        </div>
    );
}

export default Home;