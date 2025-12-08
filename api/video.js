// Vercel serverless function to redirect to YouTube
// This bypasses the YouTube app on mobile by using our domain first

export default function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  // Decode the URL and redirect
  const decodedUrl = decodeURIComponent(url);
  
  // Only allow YouTube URLs for security
  if (!decodedUrl.includes('youtube.com') && !decodedUrl.includes('youtu.be')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  // Redirect to the YouTube URL
  res.redirect(307, decodedUrl);
}

