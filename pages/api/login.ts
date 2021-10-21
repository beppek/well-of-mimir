import { NextApiResponse } from 'next';
import { ForbiddenError } from '@common/api-types';
import { fetchUser } from '@lib/content/content-fetcher';
import withSession, { NextIronRequest } from '@lib/api/session';

export default withSession(async function login(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<any> {
  try {
    const user = await fetchUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      throw new ForbiddenError('Invalid credentials');
    }

    req.session.set('user', user);
    await req.session.save();
    res.json({ ...user, isLoggedIn: true });
  } catch (error: any) {
    console.error(error);
    return res
      .status(error.status || 500)
      .send({ message: error.message || 'Internal server error' });
  }
});
