// src/service/paymentService.js

/**
 * Service de paiement pour Wave, Orange Money et MTN Money
 * Ce fichier gère les intégrations avec les différentes plateformes de paiement mobile
 */

// Configuration des API (À remplacer par vos vraies clés)
const PAYMENT_CONFIG = {
  wave: {
    apiKey: process.env.REACT_APP_WAVE_API_KEY || 'wave_test_key',
    apiUrl: process.env.REACT_APP_WAVE_API_URL || 'https://api.wave.com/v1',
    merchantId: process.env.REACT_APP_WAVE_MERCHANT_ID || 'merchant_test_id',
  },
  orangeMoney: {
    apiKey: process.env.REACT_APP_ORANGE_API_KEY || 'orange_test_key',
    apiUrl: process.env.REACT_APP_ORANGE_API_URL || 'https://api.orange.com/v1',
    merchantId: process.env.REACT_APP_ORANGE_MERCHANT_ID || 'merchant_test_id',
  },
  mtnMoney: {
    apiKey: process.env.REACT_APP_MTN_API_KEY || 'mtn_test_key',
    apiUrl: process.env.REACT_APP_MTN_API_URL || 'https://api.mtn.com/v1',
    subscriptionKey: process.env.REACT_APP_MTN_SUBSCRIPTION_KEY || 'sub_test_key',
  },
};

/**
 * Génère un ID de transaction unique
 */
const generateTransactionId = () => {
  return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide le numéro de téléphone
 */
const validatePhoneNumber = (phone, provider) => {
  // Supprimer les espaces et caractères spéciaux
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Vérifier le format
  const phoneRegex = /^(\+225|00225|0)?[0-9]{10}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { valid: false, message: 'Numéro de téléphone invalide' };
  }

  // Vérifier le préfixe selon le provider
  const prefixes = {
    'orange-money': ['07', '08', '09'],
    'mtn-money': ['05', '06'],
    'wave': ['01', '02', '03', '04', '05', '06', '07', '08', '09'], // Wave accepte tous
  };

  const prefix = cleanPhone.slice(-10, -8);
  if (provider !== 'wave' && !prefixes[provider]?.includes(prefix)) {
    return { 
      valid: false, 
      message: `Ce numéro ne correspond pas à ${provider}` 
    };
  }

  return { valid: true, phone: cleanPhone };
};

/**
 * WAVE Payment Integration
 */
export const initiateWavePayment = async (orderData) => {
  const { amount, phone, customerName, customerEmail, orderId } = orderData;
  
  // Valider le numéro
  const validation = validatePhoneNumber(phone, 'wave');
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  try {
    // MODE TEST - Simulation de paiement Wave
    console.log('Initiation paiement Wave:', orderData);
    
    // En production, remplacer par un vrai appel API:
    /*
    const response = await fetch(`${PAYMENT_CONFIG.wave.apiUrl}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYMENT_CONFIG.wave.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'XOF',
        error_url: `${window.location.origin}/payment/error`,
        success_url: `${window.location.origin}/payment/success`,
        metadata: {
          order_id: orderId,
          customer_name: customerName,
          customer_email: customerEmail,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du paiement');
    }

    // Rediriger vers la page de paiement Wave
    window.location.href = data.wave_launch_url;
    */

    // SIMULATION MODE TEST
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: generateTransactionId(),
          provider: 'Wave',
          message: 'Paiement Wave simulé avec succès',
          paymentUrl: '#', // En prod: data.wave_launch_url
        });
      }, 1500);
    });

  } catch (error) {
    console.error('Erreur Wave:', error);
    throw new Error(`Erreur Wave: ${error.message}`);
  }
};

/**
 * ORANGE MONEY Payment Integration
 */
export const initiateOrangeMoneyPayment = async (orderData) => {
  const { amount, phone, customerName, orderId } = orderData;
  
  // Valider le numéro Orange
  const validation = validatePhoneNumber(phone, 'orange-money');
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  try {
    // MODE TEST - Simulation
    console.log('Initiation paiement Orange Money:', orderData);

    // En production, utiliser l'API Orange Money:
    /*
    const response = await fetch(`${PAYMENT_CONFIG.orangeMoney.apiUrl}/webpayment/v1/transactioninit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYMENT_CONFIG.orangeMoney.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchant_key: PAYMENT_CONFIG.orangeMoney.merchantId,
        currency: 'OUV',
        order_id: orderId,
        amount: amount,
        return_url: `${window.location.origin}/payment/callback`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        notif_url: `${window.location.origin}/api/payment/notify`,
        lang: 'fr',
        reference: orderId,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur Orange Money');
    }

    // Rediriger vers la page de paiement
    window.location.href = data.payment_url;
    */

    // SIMULATION MODE TEST
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: generateTransactionId(),
          provider: 'Orange Money',
          message: 'Paiement Orange Money simulé avec succès',
        });
      }, 1500);
    });

  } catch (error) {
    console.error('Erreur Orange Money:', error);
    throw new Error(`Erreur Orange Money: ${error.message}`);
  }
};

/**
 * MTN MOBILE MONEY Payment Integration
 */
export const initiateMTNPayment = async (orderData) => {
  const { amount, phone, customerName, orderId } = orderData;
  
  // Valider le numéro MTN
  const validation = validatePhoneNumber(phone, 'mtn-money');
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  try {
    // MODE TEST - Simulation
    console.log('Initiation paiement MTN Money:', orderData);

    // En production, utiliser l'API MTN MoMo:
    /*
    // 1. Créer un access token
    const tokenResponse = await fetch(`${PAYMENT_CONFIG.mtnMoney.apiUrl}/collection/token/`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': PAYMENT_CONFIG.mtnMoney.subscriptionKey,
        'Authorization': `Basic ${btoa(PAYMENT_CONFIG.mtnMoney.apiKey)}`,
      },
    });

    const { access_token } = await tokenResponse.json();

    // 2. Initier le paiement
    const paymentResponse = await fetch(`${PAYMENT_CONFIG.mtnMoney.apiUrl}/collection/v1_0/requesttopay`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'X-Reference-Id': orderId,
        'X-Target-Environment': 'production',
        'Ocp-Apim-Subscription-Key': PAYMENT_CONFIG.mtnMoney.subscriptionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'XOF',
        externalId: orderId,
        payer: {
          partyIdType: 'MSISDN',
          partyId: validation.phone,
        },
        payerMessage: `Paiement commande ${orderId}`,
        payeeNote: `Crochet Créations - ${customerName}`,
      }),
    });

    if (!paymentResponse.ok) {
      const error = await paymentResponse.json();
      throw new Error(error.message || 'Erreur MTN Money');
    }
    */

    // SIMULATION MODE TEST
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: generateTransactionId(),
          provider: 'MTN Mobile Money',
          message: 'Paiement MTN Money simulé avec succès',
        });
      }, 1500);
    });

  } catch (error) {
    console.error('Erreur MTN Money:', error);
    throw new Error(`Erreur MTN Money: ${error.message}`);
  }
};

/**
 * Fonction principale pour initier un paiement
 */
export const initiatePayment = async (paymentMethod, orderData) => {
  switch (paymentMethod) {
    case 'wave':
      return await initiateWavePayment(orderData);
    case 'orange-money':
      return await initiateOrangeMoneyPayment(orderData);
    case 'mtn-money':
      return await initiateMTNPayment(orderData);
    case 'cash':
      // Paiement à la livraison - pas d'API nécessaire
      return {
        success: true,
        transactionId: generateTransactionId(),
        provider: 'Paiement à la livraison',
        message: 'Commande confirmée - Paiement à la livraison',
      };
    default:
      throw new Error('Méthode de paiement non supportée');
  }
};

/**
 * Vérifier le statut d'une transaction
 */
export const checkPaymentStatus = async (transactionId, provider) => {
  // MODE TEST - Toujours retourner succès
  return {
    status: 'completed',
    transactionId,
    provider,
  };

  // En production, vérifier auprès de chaque API
  /*
  switch (provider) {
    case 'wave':
      const waveResponse = await fetch(`${PAYMENT_CONFIG.wave.apiUrl}/checkout/sessions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${PAYMENT_CONFIG.wave.apiKey}`,
        },
      });
      return await waveResponse.json();
    
    case 'orange-money':
      // Vérifier statut Orange Money
      break;
    
    case 'mtn-money':
      // Vérifier statut MTN Money
      break;
  }
  */
};

export default {
  initiatePayment,
  checkPaymentStatus,
  validatePhoneNumber,
};