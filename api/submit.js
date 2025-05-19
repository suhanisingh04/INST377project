import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing comment text' });
  }

  try {
    const { error } = await supabase
      .from('comments')
      .insert([{ text }]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Comment submitted successfully' });
  } catch (err) {
    console.error('Submit error:', err.message);
    res.status(500).json({ error: 'Failed to submit comment' });
  }
}
