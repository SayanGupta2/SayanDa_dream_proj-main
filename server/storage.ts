import { users, type User, type InsertUser, contactRequests, type ContactRequest, type InsertContactRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact request methods
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getContactRequest(id: number): Promise<ContactRequest | undefined>;
  markEmailSent(id: number): Promise<boolean>;
  getAllContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactRequest>;
  currentUserId: number;
  currentContactId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const now = new Date();
    const contactRequest: ContactRequest = { 
      ...insertRequest, 
      id, 
      createdAt: now, 
      emailSent: false 
    };
    
    this.contacts.set(id, contactRequest);
    return contactRequest;
  }

  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    return this.contacts.get(id);
  }

  async markEmailSent(id: number): Promise<boolean> {
    const request = this.contacts.get(id);
    if (!request) {
      return false;
    }
    
    const updatedRequest = { ...request, emailSent: true };
    this.contacts.set(id, updatedRequest);
    return true;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
