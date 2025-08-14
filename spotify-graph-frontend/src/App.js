import React, { useState } from 'react';
import ArtistGraph from './ArtistGraph';

function App() {
  const [artistId, setArtistId] = useState('');

  return (
    <div>
      <h1>Spotify Knowledge Graph</h1>
      <input
        type="text"
        placeholder="Enter Spotify Artist ID"
        value={artistId}
        onChange={(e) => setArtistId(e.target.value)}
      />
      {artistId && <ArtistGraph artistId={artistId} />}
    </div>
  );
}

export default App;
