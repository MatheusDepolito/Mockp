import { RegisterForm } from '@mockp/ui/src/components/templates/RegisterForm';
import { AuthLayout } from '@mockp/ui/src/components/molecules/AuthLayout';

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  );
}
