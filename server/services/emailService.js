const { BrevoClient } = require("@getbrevo/brevo");

const brevoInstance = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async (to, subject, html) => {
  try {
    await brevoInstance.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_FROM_EMAIL,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,
      htmlContent: html,
    });

    return true;
  } catch (error) {
    console.log(error.response?.body || error);
    return false;
  }
};

module.exports = { sendEmail };
