// /api/cms.js

export default async function handler(req, res) {
  try {
    // Fetch data from CMS API
    const response = await fetch(
      'https://data.cms.gov/provider-data/api/1/datastore/query/isrn-hqyy/0'
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `CMS API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    res.status(200).json(data); // Send JSON to frontend
  } catch (err) {
    console.error('CMS fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch CMS data', details: err.message });
  }
}