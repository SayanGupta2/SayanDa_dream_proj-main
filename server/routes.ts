import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

// Create a mock transporter for development
const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    // In production, use real credentials from environment variables
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "sayanmaity8002@gmail.com",
        pass: process.env.EMAIL_PASS || "",
      },
    });
  } else {
    // For development, log emails instead of sending
    return {
      sendMail: async (mailOptions: any) => {
        console.log("📧 Email would be sent with:", mailOptions);
        return { messageId: `mock-${Date.now()}` };
      },
    };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactRequestSchema.parse(req.body);
      
      // Store the contact request
      const savedRequest = await storage.createContactRequest(contactData);
      
      // Send confirmation email
      try {
        const transporter = createTransporter();
        
        // Email to customer
        await transporter.sendMail({
          from: '"TaskSathi Solutions" <sayanmaity8002@gmail.com>',
          to: contactData.email,
          subject: "We've Received Your Request - TaskSathi Solutions",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <div style="background-color: #111111; padding: 20px; text-align: center; color: white;">
                <h1 style="color: #00F6FF; margin: 0;">TaskSathi Solutions</h1>
              </div>
              <div style="padding: 20px; border: 1px solid #eee; background-color: #f9f9f9;">
                <h2>Thank you for contacting us, ${contactData.fullName}!</h2>
                <p>We've received your request regarding <strong>${contactData.service}</strong>.</p>
                <p>Our team will review your requirements and get back to you within <strong>3 business days</strong>.</p>
                <p>Here's a summary of your request:</p>
                <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #00F6FF; margin: 20px 0;">
                  ${contactData.message}
                </div>
                <p>If you have any urgent queries, feel free to reach out to us via WhatsApp at <a href="https://wa.me/918942952105">+91 8942952105</a>.</p>
              </div>
              <div style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
                <p>&copy; 2023 TaskSathi Solutions. All rights reserved.</p>
              </div>
            </div>
          `,
        });
        
        // Mark email as sent in the database
        await storage.markEmailSent(savedRequest.id);
        
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // We'll still return success to the client, but log the email failure
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Contact request submitted successfully",
        id: savedRequest.id
      });
      
    } catch (error) {
      console.error("Error processing contact request:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to process your request" 
      });
    }
  });

  // Get all contact requests (for admin purposes)
  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const requests = await storage.getAllContactRequests();
      res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact requests" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
