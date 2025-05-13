import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// POST handler for the contact form submission
export async function POST(req: Request) {
  try {
    // Parse the request body (form data)
    const { name, email, phone, service, description } = await req.json();

    // Create a transporter for sending emails using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
      },
    });

    // Send the email with the form details
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's email
      to: "imaaquibali@gmail.com",  // Your email to receive the form data
      subject: `New Contact Form Submission - ${service}`, // Subject of the email
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `, // The HTML content for the email
    });

    // Return a success response after the email is sent
    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}
