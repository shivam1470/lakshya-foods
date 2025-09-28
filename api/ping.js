module.exports = async function handler(req, res) {
  try {
    // Minimal runtime introspection
    const envSummary = Object.keys(process.env || {}).filter(k => k.startsWith('NEXT_') || k === 'NODE_ENV');
    res.status(200).json({
      ok: true,
      layer: 'root-api',
      node: process.version,
      envVars: envSummary,
      ts: new Date().toISOString()
    });
  } catch (err) {
    console.error('[api/ping] runtime error', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
}
