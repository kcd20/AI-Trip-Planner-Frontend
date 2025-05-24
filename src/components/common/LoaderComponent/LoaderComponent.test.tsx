import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import LoaderComponent from './LoaderComponent';

import '@testing-library/jest-dom';

vi.mock('react-loader-spinner', () => ({
  Watch: () => <div data-testid="watch-loader">Watch Loader</div>,
  TailSpin: () => <div data-testid="tailspin-loader">TailSpin Loader</div>,
}));

describe('LoaderComponent (Vitest)', () => {
  it('does not render when openLoader is false', () => {
    const { container } = render(
      <LoaderComponent openLoader={false} variant="watch" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders Watch loader when variant is "watch"', () => {
    render(<LoaderComponent openLoader variant="watch" />);
    expect(screen.getByTestId('watch-loader')).toBeInTheDocument();
  });

  it('renders TailSpin loader when variant is "spin"', () => {
    render(<LoaderComponent openLoader variant="spin" />);
    expect(screen.getByTestId('tailspin-loader')).toBeInTheDocument();
  });

  it('does not render Watch loader when variant is "spin"', () => {
    render(<LoaderComponent openLoader variant="spin" />);
    expect(screen.queryByTestId('watch-loader')).not.toBeInTheDocument();
  });
});
