import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
  }

  const { accessToken, idToken, authorizationCode } = session;

  try {
      const response = await fetch('http://localhost:8000/dj-rest-auth/google/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              code: authorizationCode,
              id_token: idToken,
              access_token: accessToken,
          }),
      });

      const data = await response.json();

      if (!response.ok) {
          return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
  } catch (error) {
      return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}