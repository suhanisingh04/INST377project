// /api/pixabay.js

export default async function handler(req, res) {
    const API_KEY = process.env.PIXABAY_API_KEY; // ✅ Environment variable name
    const query = 'health+hospital+doctor+wellness';
  
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=10`;
  
    try {
      const pixabayRes = await fetch(url);
      const data = await pixabayRes.json();
  
      if (!data.hits || data.hits.length === 0) {
        return res.status(404).json({ error: 'No images found' });
      }
  
      res.status(200).json(data);
    } catch (err) {
      console.error('Pixabay fetch error:', err);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
}