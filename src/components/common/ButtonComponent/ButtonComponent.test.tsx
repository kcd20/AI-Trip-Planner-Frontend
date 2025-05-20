import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import ButtonComponent from './ButtonComponent';

import '@testing-library/jest-dom';

describe('ButtonComponent', () => {
  it('should render the button with the correct text', () => {
    render(
      <ButtonComponent text="Click Me" variant="contained" onClick={() => {}} />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should have the correct variant applied', () => {
    render(
      <ButtonComponent text="Click Me" variant="outlined" onClick={() => {}} />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(
      <ButtonComponent
        text="Click Me"
        variant="contained"
        onClick={handleClick}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    render(
      <ButtonComponent
        disabled
        text="Click Me"
        variant="contained"
        onClick={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should have the correct type attribute', () => {
    render(
      <ButtonComponent
        text="Submit"
        type="submit"
        variant="contained"
        onClick={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
