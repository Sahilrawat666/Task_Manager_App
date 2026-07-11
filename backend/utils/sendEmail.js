import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const data = await resend.emails.send({
            from: "Task Manager <onboarding@resend.dev>",
            to,
            subject,
            html,
        });

        console.log("Email sent:", data);
    } catch (error) {
        console.error("Resend Error:", error);
        throw error;
    }
};

export default sendEmail;