import React, { useState } from 'react';
import { Plus, Minus, Trash2, Heart, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    setIsUpdating(true);
    try {
      if (newQuantity <= 0) {
        await removeFromCart(item.item._id);
      } else {
        await updateQuantity(item.item._id, newQuantity);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(item.item._id);
    } finally {
      setIsRemoving(false);
      setShowRemoveConfirm(false);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // You can add wishlist logic here
  };

  return (
    <div className="group p-6 flex items-center space-x-4 hover:bg-gray-50 transition-all duration-200 relative overflow-hidden">
      {/* Loading overlay */}
      {(isUpdating || isRemoving) && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Product Image with hover effects */}
      <div className="w-20 h-20 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-200">
        <img
          src={item.item.image}
          alt={item.item.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-lg"></div>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {item.item.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.item.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {item.item.category}
              </span>
              <p className="text-blue-600 font-semibold">${item.item.price.toFixed(2)} each</p>
            </div>
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full transition-all duration-200 ${
              isWishlisted 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || isUpdating}
          className="p-2 hover:bg-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Minus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
          <span className="text-xs text-gray-500">qty</span>
        </div>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="p-2 hover:bg-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
        </button>
      </div>
      
      {/* Price and Actions */}
      <div className="text-right min-w-[120px]">
        <div className="space-y-2">
          <div className="text-lg font-semibold text-gray-900">
            ${(item.item.price * item.quantity).toFixed(2)}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            {!showRemoveConfirm ? (
              <button
                onClick={() => setShowRemoveConfirm(true)}
                disabled={isRemoving}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex space-x-1">
                <button
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Remove
                </button>
                <button
                  onClick={() => setShowRemoveConfirm(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;