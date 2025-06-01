import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import LoginPage from './LoginPage';

import '@testing-library/jest-dom';

vi.mock('@clerk/clerk-react', () => ({
  SignIn: vi.fn((props) => (
    <div data-testid="mock-clerk-sign-in">
      Mock Clerk SignIn Component
      <span data-testid="force-redirect-url">{props.forceRedirectUrl}</span>
      <span data-testid="sign-up-url">{props.signUpUrl}</span>
    </div>
  )),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders the SignIn component with default redirect URL when no saved trip', () => {
    render(<LoginPage />);

    const signInComponent = screen.getByTestId('mock-clerk-sign-in');
    expect(signInComponent).toBeInTheDocument();

    expect(screen.getByTestId('force-redirect-url')).toHaveTextContent('/');
    expect(screen.getByTestId('sign-up-url')).toHaveTextContent('/register');
  });

  it('renders the SignIn component with /trips redirect URL when savedTrip exists', () => {
    sessionStorage.setItem('savedTrip', 'someTripId');

    render(<LoginPage />);

    const signInComponent = screen.getByTestId('mock-clerk-sign-in');
    expect(signInComponent).toBeInTheDocument();

    expect(screen.getByTestId('force-redirect-url')).toHaveTextContent(
      '/trips'
    );
    expect(screen.getByTestId('sign-up-url')).toHaveTextContent('/register');
  });
});
