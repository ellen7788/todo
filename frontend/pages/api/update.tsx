import { NextApiRequest, NextApiResponse } from 'next';
import { backendBaseUrl } from '../../components/url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const updateRes = await fetch(backendBaseUrl + '/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });
  res.status(updateRes.status).json({});
};
