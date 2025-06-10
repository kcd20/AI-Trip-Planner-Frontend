import { useSetAtom } from 'jotai';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { openSnackbarAtom, snackbarAtom } from '../../store/atoms';

import useSnackbar from './useSnackbar';

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>();
  return {
    ...actual,
    useSetAtom: vi.fn(),
  };
});

// Mock your atoms if they are not simple primitive atoms and have complex logic
// For this example, we'll assume they are simple writable atoms.
vi.mock('./atoms', () => ({
  openSnackbarAtom: {}, // Mock atom object
  snackbarAtom: {}, // Mock atom object
}));

describe('useSnackbar', () => {
  let mockSetOpenSnackbar: Mock;
  let mockSetSnackbar: Mock;

  beforeEach(() => {
    // Reset mocks before each test
    mockSetOpenSnackbar = vi.fn();
    mockSetSnackbar = vi.fn();

    (useSetAtom as Mock).mockClear().mockImplementation((atom) => {
      if (atom === openSnackbarAtom) {
        return mockSetOpenSnackbar;
      }
      if (atom === snackbarAtom) {
        return mockSetSnackbar;
      }
      return vi.fn();
    });
  });

  it('should call setOpenSnackbar and setSnackbar with correct values when openSnackbar is called', () => {
    const { openSnackbar } = useSnackbar();
    const testDescription = 'Test description';
    const testSeverity = 'success';

    openSnackbar({ description: testDescription, severity: testSeverity });

    expect(mockSetOpenSnackbar).toHaveBeenCalledTimes(1);
    expect(mockSetOpenSnackbar).toHaveBeenCalledWith(true);

    expect(mockSetSnackbar).toHaveBeenCalledTimes(1);
    expect(mockSetSnackbar).toHaveBeenCalledWith({
      description: testDescription,
      severity: testSeverity,
    });
  });
});
