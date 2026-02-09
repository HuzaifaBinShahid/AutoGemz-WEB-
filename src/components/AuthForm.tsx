import { Formik, Form } from 'formik';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import CommonInput from './common/CommonInput';
import CommonButton from './common/CommonButton';
import CommonSelect from './common/CommonSelect';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
  onSubmit: (values: any) => void;
  error?: string | null;
}

const AuthForm = ({ type, onSubmit, error }: AuthFormProps) => {
  const getValidationSchema = () => {
    switch (type) {
      case 'login':
        return z.object({
          email: z.string().email('Invalid email address'),
          password: z.string().min(6, 'Password must be at least 6 characters'),
          role: z.enum(['inspector', 'admin'], {
            required_error: 'Please select a role',
          }),
        });
      case 'register':
        return z.object({
          name: z.string().min(2, 'Name must be at least 2 characters'),
          email: z.string().email('Invalid email address'),
          password: z.string().min(6, 'Password must be at least 6 characters'),
        });
      case 'forgot-password':
        return z.object({
          email: z.string().email('Invalid email address'),
        });
      default:
        return z.object({});
    }
  };

  const getInitialValues = () => {
    switch (type) {
      case 'login':
        return { email: '', password: '', role: '' };
      case 'register':
        return { name: '', email: '', password: '' };
      case 'forgot-password':
        return { email: '' };
      default:
        return {};
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'login':
        return 'LOGIN';
      case 'register':
        return 'REGISTER';
      case 'forgot-password':
        return 'FORGOT PASSWORD';
      default:
        return '';
    }
  };

  const getDescription = () => {
    if (type === 'forgot-password') {
      return 'We will send password reset link on your email Id';
    }
    return null;
  };

  const validate = (values: any) => {
    const schema = getValidationSchema();
    try {
      schema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return errors;
      }
      return {};
    }
  };

  return (
    <div className="flex-1 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2 flex items-center gap-3" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <div className="w-1 h-10 bg-autogemz-orange"></div>
            {getTitle()}
          </h2>
          {getDescription() && (
            <p className="text-gray-600 mt-2">{getDescription()}</p>
          )}
        </div>

        <Formik
          initialValues={getInitialValues()}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {type === 'register' && (
                <CommonInput
                  name="name"
                  label="NAME"
                  type="text"
                />
              )}

              <CommonInput
                name="email"
                label={type === 'forgot-password' ? 'EMAIL ID' : 'EMAIL'}
                type="email"
              />

              {type !== 'forgot-password' && (
                <CommonInput
                  name="password"
                  label="PASSWORD"
                  type="password"
                />
              )}

              {type === 'login' && (
                <CommonSelect
                  name="role"
                  label="SELECT ROLE"
                  options={[
                    { value: 'inspector', label: 'Inspector' },
                    { value: 'admin', label: 'Admin' },
                  ]}
                />
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {type === 'login' && (
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm hover:underline"
                    style={{ color: '#111111BF' }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <CommonButton type="submit" isLoading={isSubmitting}>
                {type === 'forgot-password' ? 'SEND RESET LINK' : getTitle()}
              </CommonButton>

              <div className="text-center text-sm text-gray-600">
                {/* {type === 'login' && (
                  <>
                    Not registered yet?{' '}
                    <Link
                      to="/register"
                      className="hover:underline"
                      style={{ color: '#DC3729' }}
                    >
                      Create an Account
                    </Link>
                  </>
                )} */}
                {type === 'register' && (
                  <>
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="hover:underline"
                      style={{ color: '#DC3729' }}
                    >
                      Login
                    </Link>
                  </>
                )}
                {/* {type === 'forgot-password' && (
                  <>
                    Don't have an account yet?{' '}
                    <Link
                      to="/register"
                      className="hover:underline"
                      style={{ color: '#DC3729' }}
                    >
                      Register
                    </Link>
                  </>
                )} */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
