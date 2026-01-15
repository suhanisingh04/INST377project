// /api/quote.js

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.quotable.io/random?tags=health|medicine|inspirational'
    );
    const data = await response.json();

    res.status(200).json({
      content: data.content,
      author: data.author
    });
  } catch (error) {
    console.error('Quote fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}