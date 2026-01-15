// /api/quote.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/quotes/health');
    const data = await response.json();

    // Pick a random healthcare quote from the list
    const quote = data[Math.floor(Math.random() * data.length)];

    res.status(200).json({
      content: quote.q,
      author: quote.a
    });
  } catch (error) {
    console.error('Quote fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch healthcare quote' });
  }
}
