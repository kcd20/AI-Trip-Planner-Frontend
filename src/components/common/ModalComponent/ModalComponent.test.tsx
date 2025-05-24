import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ModalComponent from './ModalComponent';

import '@testing-library/jest-dom';

describe('ModalComponent', () => {
  const defaultProps = {
    openModal: true,
    description: 'Test description',
    proceedAction: vi.fn(),
    closeModal: vi.fn(),
  };

  it('renders description text', () => {
    render(<ModalComponent {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('does not render actionText if not provided', () => {
    render(<ModalComponent {...defaultProps} />);
    expect(screen.queryByText('Extra action info')).not.toBeInTheDocument();
  });

  it('renders actionText if provided', () => {
    const actionText = 'Extra action info';
    render(<ModalComponent {...defaultProps} actionText={actionText} />);
    expect(screen.getByText(actionText)).toBeInTheDocument();
  });

  it('calls closeModal when Cancel button is clicked', () => {
    render(<ModalComponent {...defaultProps} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(defaultProps.closeModal).toHaveBeenCalled();
  });

  it('calls proceedAction when Proceed button is clicked', () => {
    render(<ModalComponent {...defaultProps} />);
    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);
    expect(defaultProps.proceedAction).toHaveBeenCalled();
  });

  it('does not render modal if openModal is false', () => {
    render(<ModalComponent {...defaultProps} openModal={false} />);
    expect(
      screen.queryByText(defaultProps.description)
    ).not.toBeInTheDocument();
  });
});
