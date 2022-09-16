import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

export default async function spotify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    });

    const credentials = await spotifyApi.clientCredentialsGrant();
    const accessToken = credentials.body.access_token;

    spotifyApi.setAccessToken(accessToken);

    const trackId = req.query['trackId'] as string;

    if (!trackId) {
      return res.status(400).json({ error: 'missing track id' });
    }

    let data;
    try {
      data = await spotifyApi.getTrack(trackId);
    } catch (error) {
      return res.status(500).json({ error: 'invalid track id' });
    }

    const track = data.body;
    const result = {
      score: track.popularity,
      title: track.name,
      url: track.external_urls.spotify,
      coverArt: track.album.images[0].url,
    };

    return res.status(200).json(result);
  } else {
    return res.status(500).json({ error: 'unsupported method' });
  }
}
