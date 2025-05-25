import { renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { describe, it, expect, vi, Mock } from 'vitest';

import useLoader from './useLoader';

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>();
  return {
    ...actual,
    useSetAtom: vi.fn(),
  };
});

describe('useLoader', () => {
  const mockSetLoaderState = vi.fn();

  beforeEach(() => {
    mockSetLoaderState.mockClear();
    (useSetAtom as Mock).mockReturnValue(mockSetLoaderState);
  });

  it('should return openLoader and closeLoader functions', () => {
    const { result } = renderHook(() => useLoader('spin'));

    expect(result.current.openLoader).toBeInstanceOf(Function);
    expect(result.current.closeLoader).toBeInstanceOf(Function);
  });

  it('openLoader should set loader state to open with the correct variant', () => {
    const variant = 'spin';
    const { result } = renderHook(() => useLoader(variant));

    result.current.openLoader();

    expect(mockSetLoaderState).toHaveBeenCalledTimes(1);
    expect(mockSetLoaderState).toHaveBeenCalledWith({
      openLoader: true,
      variant,
    });
  });

  it('closeLoader should set loader state to close with the correct variant', () => {
    const variant = 'watch';
    const { result } = renderHook(() => useLoader(variant));

    result.current.closeLoader();

    expect(mockSetLoaderState).toHaveBeenCalledTimes(1);
    expect(mockSetLoaderState).toHaveBeenCalledWith({
      openLoader: false,
      variant,
    });
  });

  it('openLoader and closeLoader should work independently for different variants', () => {
    const variant1 = 'spin';
    const variant2 = 'watch';

    const { result: result1 } = renderHook(() => useLoader(variant1));
    result1.current.openLoader();
    expect(mockSetLoaderState).toHaveBeenCalledWith({
      openLoader: true,
      variant: variant1,
    });
    mockSetLoaderState.mockClear();

    const { result: result2 } = renderHook(() => useLoader(variant2));
    result2.current.closeLoader();
    expect(mockSetLoaderState).toHaveBeenCalledWith({
      openLoader: false,
      variant: variant2,
    });
  });
});
