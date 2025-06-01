import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import LoginPage from './LoginPage';

import '@testing-library/jest-dom';

vi.mock('@clerk/clerk-react', () => ({
  SignIn: vi.fn((props) => (
    <div>
      SignInComponent
      <span data-testid="force-redirect-url">{props.forceRedirectUrl}</span>
      <span data-testid="sign-up-url">{props.signUpUrl}</span>
    </div>
  )),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders the SignIn component with default redirect URL when there is no saved trip', () => {
    render(<LoginPage />);

    expect(screen.getByText('SignInComponent')).toBeInTheDocument();

    expect(screen.getByTestId('force-redirect-url')).toHaveTextContent('/');
    expect(screen.getByTestId('sign-up-url')).toHaveTextContent('/register');
  });

  it('renders the SignIn component with /trips redirect URL when savedTrip exists', () => {
    sessionStorage.setItem('savedTrip', 'Trip details');

    render(<LoginPage />);

    expect(screen.getByText('SignInComponent')).toBeInTheDocument();

    expect(screen.getByTestId('force-redirect-url')).toHaveTextContent(
      '/trips'
    );
    expect(screen.getByTestId('sign-up-url')).toHaveTextContent('/register');
  });
});
