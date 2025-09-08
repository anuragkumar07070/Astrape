import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(item.item._id);
    } else {
      await updateQuantity(item.item._id, newQuantity);
    }
  };

  return (
    <div className="p-6 flex items-center space-x-4">
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.item.image}
          alt={item.item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900">{item.item.name}</h3>
        <p className="text-gray-600 text-sm">{item.item.description}</p>
        <p className="text-blue-600 font-semibold mt-1">${item.item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">
          ${(item.item.price * item.quantity).toFixed(2)}
        </div>
        <button
          onClick={() => removeFromCart(item.item._id)}
          className="text-red-500 hover:text-red-700 mt-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;