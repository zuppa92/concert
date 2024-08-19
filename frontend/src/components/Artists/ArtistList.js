import React, { useState, useEffect } from 'react';
import ConcertApi from '../../services/api';

function ArtistList({ searchTerm }) {
  const [artistData, setArtistData] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [tracks, setTracks] = useState([]); // State for top tracks
  const [albums, setAlbums] = useState([]);
  const [events, setEvents] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [artistImage, setArtistImage] = useState('');
  const [artistBio, setArtistBio] = useState('');

  useEffect(() => {
    // Reset states
    setArtistData(null);
    setSpotifyData(null);
    setTracks([]); // Reset tracks
    setAlbums([]);
    setEvents([]);
    setSimilarArtists([]);
    setArtistImage('');
    setArtistBio('');

    async function fetchArtistData() {
      if (!searchTerm) return;

      try {
        const data = await ConcertApi.getArtistData(searchTerm);
        console.log('Fetched artist data:', data);

        if (data.lastFmData && data.lastFmData.artist) {
          const artistInfo = data.lastFmData.artist;
          setArtistData(artistInfo);

          if (artistInfo.image && artistInfo.image.length > 0) {
            const largeImage = artistInfo.image.find(img => img.size === 'extralarge') ||
                               artistInfo.image.find(img => img.size === 'large') ||
                               artistInfo.image.find(img => img.size === 'medium') ||
                               artistInfo.image[0];

            if (largeImage && largeImage['#text']) {
              setArtistImage(largeImage['#text']);
              console.log('Artist image URL from Last.fm:', largeImage['#text']);
            } else {
              setArtistImage('https://i.redd.it/nblqzhxqb3671.png'); // Placeholder image
            }
          } else {
            setArtistImage('https://i.redd.it/nblqzhxqb3671.png'); // Placeholder image
          }

          if (artistInfo.bio && artistInfo.bio.summary) {
            setArtistBio(artistInfo.bio.summary);
          }

          if (artistInfo.similar) {
            setSimilarArtists(artistInfo.similar.artist);
          }
        }

        // Check if the tracks data structure is correct
        if (data.artistTracks && Array.isArray(data.artistTracks.track)) {
          setTracks(data.artistTracks.track.slice(0, 5)); // Set top 5 tracks
        } else if (Array.isArray(data.artistTracks)) {
          setTracks(data.artistTracks.slice(0, 5)); // Handle case where it's directly an array
        } else {
          setTracks([]); // Fallback to an empty array
        }

        if (data.artistAlbums && data.artistAlbums.album && Array.isArray(data.artistAlbums.album)) {
          setAlbums(data.artistAlbums.album.slice(0, 5)); // Set top 5 albums
        } else {
          setAlbums([]); // Fallback to an empty array
        }

        if (data.spotifyData) {
          setSpotifyData(data.spotifyData);

          if (data.spotifyData.images && data.spotifyData.images.length > 0) {
            setArtistImage(data.spotifyData.images[0].url); // Prefer Spotify image
            console.log('Artist image URL from Spotify:', data.spotifyData.images[0].url);
          } else if (!artistImage) {
            setArtistImage('https://i.redd.it/nblqzhxqb3671.png'); // Placeholder image if no Spotify image found
          }
        }

        if (data.artistEvents && Array.isArray(data.artistEvents)) {
          setEvents(data.artistEvents.slice(0, 5)); // Get only the top 5 events
        } else {
          setEvents([]); // Fallback to an empty array
        }

      } catch (err) {
        console.error('Failed to fetch artist data', err);
      }
    }

    fetchArtistData();
  }, [searchTerm]); // Only depend on searchTerm to trigger the effect

  return (
    <div>
      <h1>Artist Information</h1>
      {artistData ? (
        <div>
          <h2>{artistData.name}</h2>
          {artistImage && (
            <img 
              src={artistImage} 
              alt={`${artistData.name}`} 
              onError={(e) => { e.target.src = 'https://i.redd.it/nblqzhxqb3671.png'; }} 
            />
          )}
          <p>{artistBio}</p> 
          <p>
            <a href={artistData.url} target="_blank" rel="noopener noreferrer">
              Visit artist on Last.fm
            </a>
          </p>

          {/* Spotify Information */}
          {spotifyData && (
            <div>
              <h3>Spotify Information</h3>
              <p>Genres: {spotifyData.genres.join(', ')}</p>
              <p>Followers: {spotifyData.followers.total}</p>
              <a href={spotifyData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Visit artist on Spotify
              </a>
            </div>
          )}

          <div>
            <h3>Top 5 Tracks</h3>
            <ul>
              {tracks.length > 0 ? (
                tracks.map(track => (
                  <li key={track.name}>{track.name}</li>
                ))
              ) : (
                <p>No top tracks available.</p>
              )}
            </ul>
          </div>
          <div>
            <h3>Top 5 Albums</h3>
            <ul>
              {albums.length > 0 ? (
                albums.map(album => (
                  <li key={album.name}>{album.name}</li>
                ))
              ) : (
                <p>No top albums available.</p>
              )}
            </ul>
          </div>
          <div>
            <h3>Recent Events</h3>
            <ul>
              {events.length > 0 ? (
                events.map(event => (
                  <li key={event.id}>
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      {event.eventDate} - {event.venueName}
                    </a>
                  </li>
                ))
              ) : (
                <p>No upcoming events available for this artist.</p>
              )}
            </ul>
          </div>
          <div>
            <h3>Similar Artists</h3>
            <ul>
              {similarArtists.length > 0 ? (
                similarArtists.map(artist => (
                  <li key={artist.name}>{artist.name}</li>
                ))
              ) : (
                <p>No similar artists available.</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading artist information...</p>
      )}
    </div>
  );
}

export default ArtistList;