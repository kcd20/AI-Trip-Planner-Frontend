import { AlertColor } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import SnackbarComponent from './SnackbarComponent';

import '@testing-library/jest-dom';

describe('SnackbarComponent', () => {
  const defaultProps = {
    openSnackbar: true,
    description: 'Snackbar message',
    severity: 'success' as AlertColor,
    onClose: vi.fn(),
  };

  it('renders the description text when openSnackbar is true', () => {
    render(<SnackbarComponent {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('does not render the Snackbar when openSnackbar is false', () => {
    render(<SnackbarComponent {...defaultProps} openSnackbar={false} />);
    expect(
      screen.queryByText(defaultProps.description)
    ).not.toBeInTheDocument();
  });

  it('calls onClose when Snackbar auto-hides after duration', async () => {
    render(<SnackbarComponent {...defaultProps} />);

    await waitFor(
      () => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      },
      { timeout: 5000 }
    );
  });

  it('renders the correct severity level', () => {
    render(<SnackbarComponent {...defaultProps} severity="error" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledError');
  });
});
