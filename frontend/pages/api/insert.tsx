import { NextApiRequest, NextApiResponse } from 'next';
import { backendBaseUrl } from '../../components/url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const insertRes = await fetch(backendBaseUrl + '/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });
  res.status(insertRes.status).json({});
};
