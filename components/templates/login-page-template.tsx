import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box } from '@components/atoms/box';
import { Heading } from '@components/atoms/typography/heading';
import { Input } from '@components/atoms/input';
import { useAuth } from '@hooks/use-auth';
import { Button } from '@components/atoms/button';

export function LoginPageTemplate() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const redirectUrl = router.query.redirect
    ? decodeURIComponent(router.query.redirect as string)
    : 'account';
  const { login } = useAuth({
    redirectTo: redirectUrl,
    redirectIfFound: true,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <Box>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <Input onChange={(e) => setEmail(e.target.value)} type="email" />
        <Input onChange={(e) => setPassword(e.target.value)} type="password" />
        <Button isLoading={isLoading} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
}
