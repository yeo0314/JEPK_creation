// src/service/ordersService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const ORDERS_COLLECTION = 'orders';

/**
 * Créer une nouvelle commande
 */
export const createOrder = async (orderData) => {
  try {
    const order = {
      ...orderData,
      status: 'pending', // pending, processing, completed, cancelled
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    
    return {
      id: docRef.id,
      ...order,
    };
  } catch (error) {
    console.error('Erreur création commande:', error);
    throw new Error('Impossible de créer la commande');
  }
};

/**
 * Récupérer toutes les commandes
 */
export const getAllOrders = async () => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    throw new Error('Impossible de récupérer les commandes');
  }
};

/**
 * Récupérer une commande par ID
 */
export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Commande non trouvée');
    }
  } catch (error) {
    console.error('Erreur récupération commande:', error);
    throw error;
  }
};

/**
 * Récupérer les commandes par email client
 */
export const getOrdersByEmail = async (email) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('customerEmail', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Erreur récupération commandes client:', error);
    throw new Error('Impossible de récupérer les commandes');
  }
};

/**
 * Mettre à jour le statut d'une commande
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: Timestamp.now(),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    throw new Error('Impossible de mettre à jour le statut');
  }
};

/**
 * Mettre à jour une commande complète
 */
export const updateOrder = async (orderId, orderData) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    
    await updateDoc(orderRef, {
      ...orderData,
      updatedAt: Timestamp.now(),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erreur mise à jour commande:', error);
    throw new Error('Impossible de mettre à jour la commande');
  }
};

/**
 * Supprimer une commande
 */
export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression commande:', error);
    throw new Error('Impossible de supprimer la commande');
  }
};

/**
 * Récupérer les statistiques des commandes
 */
export const getOrderStats = async () => {
  try {
    const orders = await getAllOrders();
    
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.amount || 0), 0),
      recentOrders: orders.slice(0, 5),
    };
    
    return stats;
  } catch (error) {
    console.error('Erreur statistiques:', error);
    throw new Error('Impossible de récupérer les statistiques');
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrderStats,
};