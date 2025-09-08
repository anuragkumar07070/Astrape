import React, { useState } from 'react';
import { ShoppingCart, Star, Tag, Truck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    const result = await addToCart(item._id, 1);
    if (!result.success) {
      alert(result.message);
    }
    setIsLoading(false);
  };

 

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden relative">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
            ${item.price}
          </div>
        </div>

        {/* Stock Status */}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
              Out of Stock
            </span>
          </div>
        )}

        {item.stock > 0 && item.stock <= 5 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-md">
              Only {item.stock} left
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-full">
            <Tag className="w-3 h-3" />
            {item.category || 'Product'}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-xs text-gray-500">4.8</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1.5 rounded-full">
            <Truck className="w-3.5 h-3.5" />
            <span className="font-medium">Free Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Fast Delivery</span>
          </div>
        </div>

        {/* Price & Cart Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">${item.price}</span>
              <span className="text-sm text-gray-400 line-through">${(item.price * 1.3).toFixed(2)}</span>
            </div>
            <span className="text-xs text-green-600 font-medium">
              Save ${((item.price * 1.3) - item.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={item.stock === 0 || isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-lg active:scale-95 shadow-md shadow-blue-500/20"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <ShoppingCart className="w-4.5 h-4.5" />
            )}
            <span className="text-sm">
              {item.stock === 0 ? 'Sold Out' : isLoading ? 'Adding...' : 'Add to Cart'}
            </span>
          </button>
        </div>

        {/* Low Stock Indicator */}
        {item.stock > 0 && item.stock <= 10 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>Stock level</span>
              <span className="text-orange-600 font-medium">{item.stock}/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.stock / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;