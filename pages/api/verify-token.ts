import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { ForbiddenError } from '@common/api-types';
import { fetchUser, verifyUser } from '@lib/content/content-fetcher';

const clientSecret = process.env.JWT_SECRET as string;

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  try {
    const data = jwt.verify(req.body.token, clientSecret) as any;
    if (!data) throw new ForbiddenError('Invalid token');
    const user = await verifyUser({
      email: data.user.email,
    });
    if (!user) throw new ForbiddenError('Invalid token');
    return res.status(200).send({ user, token: req.body.token });
  } catch (error: any) {
    console.error(error);
    return res
      .status(error.status || 500)
      .send({ message: error.message || 'Internal server error' });
  }
}
