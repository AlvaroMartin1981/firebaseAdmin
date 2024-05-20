import RoutesApp from './routes/Routes'
import './App.css'

import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'


function App() {
  

  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <RoutesApp />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}

export default App
