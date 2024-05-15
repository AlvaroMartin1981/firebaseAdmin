import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Routes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<Product />} />
                <Route path="/products/new" element={<NewProduct />} />
                <Route path="/products/:productId/edit" element={<EditProduct />} />
            </Routes>
        </Router>
    )
}