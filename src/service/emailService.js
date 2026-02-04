// src/service/emailService.js
import emailjs from '@emailjs/browser';

// Configuration EmailJS
// Obtenez vos clés sur https://www.emailjs.com
const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

/**
 * Initialiser EmailJS
 */
export const initEmailService = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

/**
 * Envoyer un email de confirmation de commande au client
 */
export const sendOrderConfirmation = async (orderData) => {
  try {
    const {
      customerName,
      customerEmail,
      orderId,
      transactionId,
      amount,
      cart,
      deliveryAddress,
      paymentMethod,
    } = orderData;

    // Créer la liste des produits
    const productsList = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()} FCFA`
      )
      .join('\n');

    const templateParams = {
      to_name: customerName,
      to_email: customerEmail,
      order_id: orderId,
      transaction_id: transactionId,
      amount: amount.toLocaleString(),
      products: productsList,
      delivery_address: deliveryAddress,
      payment_method: paymentMethod,
      order_date: new Date().toLocaleDateString('fr-FR'),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email envoyé avec succès:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw new Error("Impossible d'envoyer l'email de confirmation");
  }
};

/**
 * Envoyer un email de notification de commande à l'admin
 */
export const sendAdminNotification = async (orderData) => {
  try {
    const {
      customerName,
      orderId,
      amount,
      cart,
      deliveryAddress,
    } = orderData;

    const productsList = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()} FCFA`
      )
      .join('\n');

    const templateParams = {
      admin_email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@crochetcreations.com',
      order_id: orderId,
      customer_name: customerName,
      amount: amount.toLocaleString(),
      products: productsList,
      delivery_address: deliveryAddress,
      order_date: new Date().toLocaleDateString('fr-FR'),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'admin_notification_template', // Template séparé pour l'admin
      templateParams
    );

    console.log('Notification admin envoyée:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erreur notification admin:', error);
    // Ne pas bloquer la commande si l'email admin échoue
    return { success: false, error };
  }
};

/**
 * Envoyer un email de changement de statut
 */
export const sendStatusUpdate = async (orderData, newStatus) => {
  try {
    const { customerName, customerEmail, orderId } = orderData;

    const statusMessages = {
      processing: 'Votre commande est en cours de préparation',
      shipped: 'Votre commande a été expédiée',
      completed: 'Votre commande a été livrée',
      cancelled: 'Votre commande a été annulée',
    };

    const templateParams = {
      to_name: customerName,
      to_email: customerEmail,
      order_id: orderId,
      status: statusMessages[newStatus] || newStatus,
      update_date: new Date().toLocaleDateString('fr-FR'),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'status_update_template', // Template pour les mises à jour
      templateParams
    );

    console.log('Email de mise à jour envoyé:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erreur email mise à jour:', error);
    throw new Error("Impossible d'envoyer l'email de mise à jour");
  }
};

/**
 * Template email HTML (pour référence)
 */
export const getEmailTemplate = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(to right, #ec4899, #9333ea);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .order-details {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(to right, #ec4899, #9333ea);
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 25px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧶 Crochet Créations</h1>
      <p>Confirmation de commande</p>
    </div>
    <div class="content">
      <h2>Merci pour votre commande !</h2>
      <p>Bonjour {{to_name}},</p>
      <p>Nous avons bien reçu votre commande et nous vous en remercions !</p>
      
      <div class="order-details">
        <h3>Détails de la commande</h3>
        <p><strong>Numéro de commande:</strong> {{order_id}}</p>
        <p><strong>Transaction ID:</strong> {{transaction_id}}</p>
        <p><strong>Date:</strong> {{order_date}}</p>
        <p><strong>Montant total:</strong> {{amount}} FCFA</p>
        <p><strong>Mode de paiement:</strong> {{payment_method}}</p>
        
        <h4>Produits commandés:</h4>
        <pre>{{products}}</pre>
        
        <h4>Adresse de livraison:</h4>
        <p>{{delivery_address}}</p>
      </div>
      
      <p>Vous recevrez un email de suivi dès que votre commande sera expédiée.</p>
      
      <center>
        <a href="https://votre-site.com" class="button">Suivre ma commande</a>
      </center>
    </div>
    <div class="footer">
      <p>Crochet Créations - Fait main avec amour 💜</p>
      <p>Des questions ? Contactez-nous à support@crochetcreations.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Envoyer un message de contact
 */
export const sendContactEmail = async (contactData) => {
  try {
    const { name, email, phone, subject, message } = contactData;

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || 'Non renseigné',
      subject: subject,
      message: message,
      to_email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@crochetcreations.com',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'contact_form_template', // Créez ce template dans EmailJS
      templateParams
    );

    console.log('Email de contact envoyé:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erreur envoi email contact:', error);
    throw new Error("Impossible d'envoyer le message de contact");
  }
};

export default {
  initEmailService,
  sendOrderConfirmation,
  sendAdminNotification,
  sendStatusUpdate,
  sendContactEmail,
  getEmailTemplate,
};