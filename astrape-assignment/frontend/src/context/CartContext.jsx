import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
    case 'ADD_ITEM':
    case 'UPDATE_ITEM':
    case 'REMOVE_ITEM':
      return { ...state, items: action.payload.items, total: action.payload.total, loading: false, error: null };
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchCart();
    else dispatch({ type: 'CLEAR_CART' });
  }, [user]);

  const calculateTotal = (items) => items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);

  const fetchCart = async () => {
    if (!user) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.get('/cart');
      const items = response.data.items || [];
      const total = calculateTotal(items);
      dispatch({ type: 'SET_CART', payload: { items, total } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch cart' });
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    if (!user) throw new Error('Please login to add items to cart');
    try {
      const response = await api.post('/cart', { itemId, quantity });
      const items = response.data.items || [];
      const total = calculateTotal(items);
      dispatch({ type: 'ADD_ITEM', payload: { items, total } });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/${itemId}`, { quantity });
      const items = response.data.items || [];
      const total = calculateTotal(items);
      dispatch({ type: 'UPDATE_ITEM', payload: { items, total } });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await api.delete(`/cart/${itemId}`);
      const items = response.data.items || [];
      const total = calculateTotal(items);
      dispatch({ type: 'REMOVE_ITEM', payload: { items, total } });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getItemCount = () => state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      loading: state.loading,
      error: state.error,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getItemCount,
      refreshCart: fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
