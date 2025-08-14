import { Router } from 'express';
import spotifyApi from './spotify.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Example search endpoint
router.get('/search/:artist', async (req, res) => {
  try {
    const { artist } = req.params;
    const data = await spotifyApi.searchArtists(artist);
    res.json(data.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Spotify API call failed' });
  }
});

router.get('/related-artists/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Get main artist
    const artistData = await spotifyApi.getArtist(id);
    const mainNode = {
      id: artistData.body.id,
      label: artistData.body.name
    };

    // Step 2: Get related artists
    const relatedData = await spotifyApi.getArtistRelatedArtists(id);
    const relatedNodes = relatedData.body.artists.map(artist => ({
      id: artist.id,
      label: artist.name
    }));

    // Step 3: Create edges
    const edges = relatedNodes.map(artist => ({
      from: mainNode.id,
      to: artist.id,
      label: 'related'
    }));

    // Step 4: Return vis-network shape
    res.json({
      nodes: [mainNode, ...relatedNodes],
      edges
    });
  } catch (error) {
    console.error('Error fetching related artists:', error);
    res.status(500).json({ error: 'Failed to fetch related artists' });
  }
});


export default router;


