import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DataSet, Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';


export default function ArtistGraph({ artistId }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) return;

    async function fetchData() {
      setLoading(true);
      try {
        // Fetch from our backend
        const res = await axios.get(`http://localhost:5000/api/related-artists/${artistId}`);
        const { nodes, edges } = res.data;

        // Create vis-network datasets
        const nodeDataSet = new DataSet(nodes);
        const edgeDataSet = new DataSet(edges);

        // Set up network
        const options = {
          nodes: {
            shape: 'dot',
            size: 20,
            font: { size: 16 },
            borderWidth: 2
          },
          edges: {
            width: 2,
            color: { color: '#ccc' },
            arrows: { to: { enabled: false } }
          },
          physics: {
            enabled: true,
            stabilization: false
          },
          interaction: {
            hover: true
          }
        };

        new Network(containerRef.current, { nodes: nodeDataSet, edges: edgeDataSet }, options);
      } catch (err) {
        console.error('Error loading graph:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [artistId]);

  return (
    <div style={{ height: '600px', border: '1px solid #ddd' }}>
      {loading && <p>Loading graph...</p>}
      <div ref={containerRef} style={{ height: '100%' }}></div>
    </div>
  );
}
