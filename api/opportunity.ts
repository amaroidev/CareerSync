import { storage } from '../server/storage';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing opportunity id' });
    try {
      const opportunity = await storage.getOpportunityById(id);
      if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
      return res.status(200).json(opportunity);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch opportunity' });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
