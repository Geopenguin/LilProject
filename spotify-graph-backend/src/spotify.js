import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// TODO: Implement OAuth access + refresh token handling
// For now, we can use client credentials for read-only endpoints
(async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('🎟️ Spotify access token set');
  } catch (err) {
    console.error('Error retrieving access token', err);
  }
})();

export default spotifyApi;
