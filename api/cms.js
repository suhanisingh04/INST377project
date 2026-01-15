// /api/cms.js

export default async function handler(req, res) {
  const CMS_URL =
    'https://data.cms.gov/provider-data/api/1/datastore/query/isrn-hqyy/0';

  try {
    const response = await fetch(CMS_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('CMS fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch CMS data' });
  }
}