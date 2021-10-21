import withSession, { NextIronRequest } from '@lib/api/session';
import { NextApiResponse } from 'next';

export default withSession(async function (
  req: NextIronRequest,
  res: NextApiResponse,
) {
  const user = req.session.get('user');
  res.send({ ...user, isLoggedIn: !!user });
});
