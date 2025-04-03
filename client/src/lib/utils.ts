import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Email validation regex
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Function to validate email
export function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

// Function to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Function to generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Function to smooth scroll to an element
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Phone number formatter for WhatsApp
export function formatWhatsAppNumber(number: string): string {
  return number.startsWith("+") ? number : `+${number}`;
}

// Create WhatsApp URL
export function createWhatsAppUrl(phoneNumber: string, message: string = ""): string {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedNumber.replace("+", "")}${message ? `?text=${encodedMessage}` : ""}`;
}

// Create gloss/glass background style
export function createGlassStyle(opacity: number = 0.05, blur: number = 10): React.CSSProperties {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };
}

// Create neon border style
export function createNeonBorderStyle(color: string = "rgba(0, 246, 255, 0.5)", size: number = 15): React.CSSProperties {
  return {
    boxShadow: `0 0 ${size}px ${color}`,
    border: `1px solid ${color.replace("0.5", "0.3")}`,
  };
}
