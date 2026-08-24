import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from './StoreContext';

function App() {
  const [products, setProducts] = useState([]);
  // UI State for sidebars
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const { cart, addToCart, removeFromCart, wishlist, toggleWishlist } = useContext(StoreContext);

  useEffect(() => {
    axios.get('https://pleasant-stillness-production-14ee.up.railway.app/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Calculate Cart Total
  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden">
      
      
      {/* Overlay for when sidebars are open */}
      {(isCartOpen || isWishlistOpen) && (
  <div 
    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
    onClick={() => { setIsCartOpen(false); setIsWishlistOpen(false); }}
  />
)}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-serif uppercase tracking-widest">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-2xl text-gray-400 hover:text-black">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : null}
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <img src={item.image_url} alt={item.name} className="w-20 h-24 object-cover bg-gray-50" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 mt-2 uppercase tracking-wide hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4 font-medium">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Wishlist Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-serif uppercase tracking-widest">Wishlist</h2>
          <button onClick={() => setIsWishlistOpen(false)} className="text-2xl text-gray-400 hover:text-black">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? <p className="text-gray-500">Your wishlist is empty.</p> : null}
          {wishlist.map(item => (
            <div key={item.id} className="flex gap-4 border-b pb-4 items-center">
              <img src={item.image_url} alt={item.name} className="w-20 h-24 object-cover bg-gray-50" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{parseFloat(item.price).toFixed(2)}</p>
                <button 
                  onClick={() => { addToCart(item); toggleWishlist(item); setIsWishlistOpen(false); setIsCartOpen(true); }}
                  className="text-xs text-black border-b border-black mt-2 uppercase tracking-wide hover:text-gray-600"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-100 sticky top-0 bg-white z-30">
        <h1 className="text-3xl font-serif tracking-widest uppercase">Estele</h1>
        <div className="flex space-x-6 text-sm uppercase tracking-wide">
          <button onClick={() => setIsWishlistOpen(true)} className="hover:text-gray-500">
            Wishlist ({wishlist.length})
          </button>
          <button onClick={() => setIsCartOpen(true)} className="hover:text-gray-500 font-bold">
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-light text-center mb-12 uppercase tracking-widest">New Arrivals</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map(product => {
            const isInWishlist = wishlist.some(item => item.id === product.id);
            
            return (
              <div key={product.id} className="group relative">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 z-10 p-2 text-2xl transition-colors duration-200 drop-shadow-md ${isInWishlist ? 'text-red-500' : 'text-white hover:text-gray-200'}`}
                >
                  {isInWishlist ? '♥' : '♡'}
                </button>

                <div className="w-full aspect-[4/5] bg-gray-100 mb-4 overflow-hidden relative cursor-pointer">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={() => { addToCart(product); setIsCartOpen(true); }}
                      className="w-full bg-black text-white py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{parseFloat(product.price).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;