'use client';
import { useFormLogin } from '@mockp/forms/src/login';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface ILoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();

  console.log('errors', errors);

  const { replace } = useRouter();

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        console.log('data: ', data);
        const { email, password } = data;
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          replace('/');
        }

        if (result?.error) {
          alert('Login failed. Try again');
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput {...register('email')} placeholder="email@email.com" />
      </HtmlLabel>

      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          {...register('password')}
          placeholder="******"
        />
      </HtmlLabel>
      <Button type="submit">Submit</Button>
      <div className="mt-4 text-sm">
        Do not have an mockp account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create One
        </Link>{' '}
        now.
      </div>
    </Form>
  );
};
