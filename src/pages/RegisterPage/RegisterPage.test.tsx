import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RegisterPage from './RegisterPage';

import '@testing-library/jest-dom';

vi.mock('@clerk/clerk-react', () => ({
  SignUp: vi.fn(({ signInUrl }) => (
    <div data-signinurl={signInUrl} data-testid="mock-signup">
      Mock SignUp Component
    </div>
  )),
}));

describe('RegisterPage', () => {
  it('renders the SignUp component with the correct signInUrl', () => {
    render(<RegisterPage />);

    const signUpComponent = screen.getByTestId('mock-signup');
    expect(signUpComponent).toBeInTheDocument();

    expect(signUpComponent).toHaveAttribute('data-signinurl', '/login');
  });
});
