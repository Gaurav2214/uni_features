import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { firstName, lastName, email, mobile, service, studyLevel, country, month, year } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false },
        });

        // Email to admin
        await transporter.sendMail({
            from: `"Student Enquiry" <no-reply@applyuninow.com>`,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Enquiry Received',
            text: `New enquiry from ${firstName} ${lastName}\nEmail: ${email}\nMobile: ${mobile}\nService: ${service}\nStudy Level: ${studyLevel}\nCountry: ${country}\nDate: ${month}-${year}`,
        });

        // Confirmation email to user
        await transporter.sendMail({
            from: '"AUN Tech Consulting Pvt Ltd" <no-reply@applyuninow.com>',
            to: email,
            subject: 'Enquiry Received',
            text: `Hi ${firstName},\n\nWe have received your enquiry. Our team will contact you soon.\n\nThank you!`,
        });

        res.status(200).json({ message: 'Enquiry submitted successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
}
