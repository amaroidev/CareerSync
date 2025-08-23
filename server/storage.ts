import {
  users,
  opportunities,
  applications,
  userProfiles,
  type User,
  type UpsertUser,
  type Opportunity,
  type Application,
  type UserProfile,
  type InsertOpportunity,
  type InsertApplication,
  type InsertUserProfile,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // User profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Opportunity operations
  getOpportunities(filters?: {
    type?: string;
    location?: string;
    field?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Opportunity[]>;
  getOpportunityById(id: string): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  
  // Application operations
  getUserApplications(userId: string): Promise<(Application & { opportunity: Opportunity })[]>;
  getApplicationsByStatus(userId: string, status: string): Promise<(Application & { opportunity: Opportunity })[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application>;
  deleteApplication(id: string): Promise<void>;
  
  // Dashboard data
  getUserStats(userId: string): Promise<{
    totalApplications: number;
    interviews: number;
    upcomingDeadlines: number;
  }>;
  
  getUpcomingDeadlines(userId: string): Promise<(Application & { opportunity: Opportunity })[]>;
  getRecommendedOpportunities(userId: string, limit?: number): Promise<Opportunity[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return newProfile;
  }

  async updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }

  // Opportunity operations
  async getOpportunities(filters?: {
    type?: string;
    location?: string;
    field?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Opportunity[]> {
    let query = db.select().from(opportunities).where(eq(opportunities.isActive, true));
    
    const conditions = [];
    
    if (filters?.type && filters.type !== 'All Types') {
      conditions.push(eq(opportunities.type, filters.type as any));
    }
    
    if (filters?.location && filters.location !== 'All Locations') {
      conditions.push(ilike(opportunities.location, `%${filters.location}%`));
    }
    
    if (filters?.search) {
      conditions.push(
        or(
          ilike(opportunities.title, `%${filters.search}%`),
          ilike(opportunities.company, `%${filters.search}%`),
          ilike(opportunities.description, `%${filters.search}%`)
        )
      );
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    query = query.orderBy(desc(opportunities.createdAt));
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }
    
    return await query;
  }

  async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    const [opportunity] = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.id, id));
    return opportunity;
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    const [newOpportunity] = await db
      .insert(opportunities)
      .values(opportunity)
      .returning();
    return newOpportunity;
  }

  // Application operations
  async getUserApplications(userId: string): Promise<(Application & { opportunity: Opportunity })[]> {
    return await db
      .select()
      .from(applications)
      .leftJoin(opportunities, eq(applications.opportunityId, opportunities.id))
      .where(eq(applications.userId, userId))
      .orderBy(desc(applications.updatedAt))
      .then(rows => 
        rows.map(row => ({
          ...row.applications!,
          opportunity: row.opportunities!
        }))
      );
  }

  async getApplicationsByStatus(userId: string, status: string): Promise<(Application & { opportunity: Opportunity })[]> {
    return await db
      .select()
      .from(applications)
      .leftJoin(opportunities, eq(applications.opportunityId, opportunities.id))
      .where(and(
        eq(applications.userId, userId),
        eq(applications.status, status as any)
      ))
      .orderBy(desc(applications.updatedAt))
      .then(rows => 
        rows.map(row => ({
          ...row.applications!,
          opportunity: row.opportunities!
        }))
      );
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [newApplication] = await db
      .insert(applications)
      .values(application)
      .returning();
    return newApplication;
  }

  async updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application> {
    const [updatedApplication] = await db
      .update(applications)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(applications.id, id))
      .returning();
    return updatedApplication;
  }

  async deleteApplication(id: string): Promise<void> {
    await db.delete(applications).where(eq(applications.id, id));
  }

  // Dashboard data
  async getUserStats(userId: string): Promise<{
    totalApplications: number;
    interviews: number;
    upcomingDeadlines: number;
  }> {
    const totalApplicationsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .where(eq(applications.userId, userId));

    const interviewsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .where(and(
        eq(applications.userId, userId),
        eq(applications.status, 'interview')
      ));

    const deadlinesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .leftJoin(opportunities, eq(applications.opportunityId, opportunities.id))
      .where(and(
        eq(applications.userId, userId),
        sql`${opportunities.deadline} > NOW() AND ${opportunities.deadline} < NOW() + INTERVAL '30 days'`
      ));

    return {
      totalApplications: totalApplicationsResult[0]?.count || 0,
      interviews: interviewsResult[0]?.count || 0,
      upcomingDeadlines: deadlinesResult[0]?.count || 0,
    };
  }

  async getUpcomingDeadlines(userId: string): Promise<(Application & { opportunity: Opportunity })[]> {
    return await db
      .select()
      .from(applications)
      .leftJoin(opportunities, eq(applications.opportunityId, opportunities.id))
      .where(and(
        eq(applications.userId, userId),
        sql`${opportunities.deadline} > NOW() AND ${opportunities.deadline} < NOW() + INTERVAL '30 days'`
      ))
      .orderBy(opportunities.deadline)
      .limit(5)
      .then(rows => 
        rows.map(row => ({
          ...row.applications!,
          opportunity: row.opportunities!
        }))
      );
  }

  async getRecommendedOpportunities(userId: string, limit = 10): Promise<Opportunity[]> {
    // For now, return recent opportunities. In production, this would use AI matching
    return await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.isActive, true))
      .orderBy(desc(opportunities.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
