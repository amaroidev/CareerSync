import { storage } from '../server/storage';
// import your auth logic as needed

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user' });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
