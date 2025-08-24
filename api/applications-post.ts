import { storage } from '../server/storage';
import { insertApplicationSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: any, res: any) {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'POST') {
    try {
      const applicationData = insertApplicationSchema.parse({ ...req.body, userId });
      const application = await storage.createApplication(applicationData);
      return res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid application data', errors: error.errors });
      }
      return res.status(500).json({ message: 'Failed to create application' });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
