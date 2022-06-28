import { NextApiRequest, NextApiResponse } from 'next';
import { backendBaseUrl } from '../../components/url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const deleteRes = await fetch(backendBaseUrl + '/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });
  res.status(deleteRes.status).json({});
};
