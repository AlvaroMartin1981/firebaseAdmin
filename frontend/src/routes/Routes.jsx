import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cards" element={<Products />} />
                <Route path="/cards/:cardsId" element={<Product />} />
                <Route path="/sets" element={<Products />} />
                <Route path="/sets/:setId" element={<Product />} />
                <Route path="/cards/name/:name" element={<Product />} />
                
            </Routes>
        </Router>
    )
};

export default RoutesApp