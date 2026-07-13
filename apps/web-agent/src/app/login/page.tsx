import { LoginForm } from '@mockp/ui/src/components/templates/LoginForm';
import { AuthLayout } from '@mockp/ui/src/components/molecules/AuthLayout';

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  );
}
