import { storage } from '../server/storage';
import { insertUserProfileSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // Authentication logic should be handled here or via middleware
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const profile = await storage.getUserProfile(userId);
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch profile' });
    }
  }
  if (req.method === 'POST') {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const profileData = insertUserProfileSchema.parse({ ...req.body, userId });
      const existingProfile = await storage.getUserProfile(userId);
      let profile;
      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      return res.status(200).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid profile data', errors: error.errors });
      }
      return res.status(500).json({ message: 'Failed to save profile' });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
