import withSession, { NextIronRequest } from '@lib/api/session';
import { NextApiResponse } from 'next';

export default withSession(async function (
  req: NextIronRequest,
  res: NextApiResponse,
) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
