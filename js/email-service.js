// Email Service for sending confirmation emails
// This can be integrated with EmailJS or SendGrid

// EmailJS Configuration (Optional)
// Sign up at https://www.emailjs.com/ to get your credentials
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

// Send confirmation email to customer
export async function sendConfirmationEmail(formData) {
    try {
        // Option 1: Using EmailJS (Recommended for simple setup)
        if (typeof emailjs !== 'undefined') {
            const templateParams = {
                to_name: formData.name,
                to_email: formData.email,
                company: formData.company || 'N/A',
                service: formData.service,
                message: formData.message,
                reply_to: 'sales@toya-studio.com'
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            console.log('✅ Confirmation email sent to:', formData.email);
            return { success: true };
        }

        // Option 2: Using Firebase Cloud Functions (More advanced)
        // You would need to set up a Cloud Function to send emails
        
        console.log('📧 Email service not configured');
        return { success: false, message: 'Email service not configured' };
        
    } catch (error) {
        console.error('❌ Error sending confirmation email:', error);
        return { success: false, error: error.message };
    }
}

// Send notification email to admin
export async function sendAdminNotification(formData) {
    try {
        if (typeof emailjs !== 'undefined') {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                company: formData.company || 'N/A',
                service: formData.service,
                message: formData.message,
                to_email: 'sales@toya-studio.com'
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                'admin_notification_template', // Different template for admin
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            console.log('✅ Admin notification sent');
            return { success: true };
        }

        return { success: false, message: 'Email service not configured' };
        
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        return { success: false, error: error.message };
    }
}

// Email Templates (for reference)
export const EMAIL_TEMPLATES = {
    confirmation: {
        subject: 'شكراً لتواصلك مع Toya Studio',
        body: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #EB3223;">Toya Studio</h1>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
                    <h2 style="color: #333; margin-bottom: 20px;">مرحباً {{name}}،</h2>
                    
                    <p style="color: #666; line-height: 1.8; font-size: 16px;">
                        شكراً لتواصلك معنا! تم استلام رسالتك بنجاح.
                    </p>
                    
                    <p style="color: #666; line-height: 1.8; font-size: 16px;">
                        سيقوم فريقنا بمراجعة رسالتك والرد عليك في أقرب وقت ممكن.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #EB3223; margin-bottom: 15px;">تفاصيل رسالتك:</h3>
                        <p><strong>الخدمة المطلوبة:</strong> {{service}}</p>
                        <p><strong>الشركة:</strong> {{company}}</p>
                        <p><strong>الرسالة:</strong><br>{{message}}</p>
                    </div>
                    
                    <p style="color: #666; line-height: 1.8; font-size: 16px;">
                        إذا كان لديك أي استفسارات عاجلة، يمكنك التواصل معنا مباشرة:
                    </p>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 5px 0;">📧 البريد الإلكتروني: sales@toya-studio.com</p>
                        <p style="margin: 5px 0;">📱 الهاتف: +20 1116111860</p>
                        <p style="margin: 5px 0;">📍 العنوان: 2 Taher Al Dahi, El-Bostan, Heliopolis, Cairo</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #999; font-size: 14px;">
                    <p>© 2026 Toya Studio. All rights reserved.</p>
                </div>
            </div>
        `
    },
    
    adminNotification: {
        subject: 'رسالة جديدة من موقع Toya Studio',
        body: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #EB3223;">رسالة جديدة من الموقع</h2>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>الاسم:</strong> {{name}}</p>
                    <p><strong>البريد الإلكتروني:</strong> {{email}}</p>
                    <p><strong>الشركة:</strong> {{company}}</p>
                    <p><strong>الخدمة المطلوبة:</strong> {{service}}</p>
                    <p><strong>الرسالة:</strong><br>{{message}}</p>
                    <p><strong>التاريخ:</strong> {{date}}</p>
                </div>
                
                <a href="mailto:{{email}}" style="display: inline-block; background: #EB3223; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                    الرد على الرسالة
                </a>
            </div>
        `
    }
};

console.log('📧 Email service module loaded');
