import { storage } from '../server/storage';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const { type, location, field, search, limit, offset } = req.query;
      const opportunities = await storage.getOpportunities({
        type: type as string,
        location: location as string,
        field: field as string,
        search: search as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      return res.status(200).json(opportunities);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch opportunities' });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
