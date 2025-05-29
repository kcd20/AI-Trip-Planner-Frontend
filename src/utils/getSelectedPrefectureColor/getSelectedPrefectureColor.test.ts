import { describe, it, expect } from 'vitest';

import getSelectedPrefectureColor from './getSelectedPrefectureColor';

describe('getSelectedPrefectureColor', () => {
  it('should return the selected color when the prefecture is in the selected list', () => {
    const selectedPrefectures = ['Tokyo', 'Osaka'];
    const prefecture = 'Tokyo';
    expect(getSelectedPrefectureColor(prefecture, selectedPrefectures)).toBe(
      '#1976d2'
    );
  });

  it('should return the default color when the prefecture is not in the selected list', () => {
    const selectedPrefectures = ['Tokyo', 'Osaka'];
    const prefecture = 'Hokkaido';
    expect(getSelectedPrefectureColor(prefecture, selectedPrefectures)).toBe(
      '#d9d9d9'
    );
  });

  it('should return the default color when selectedPrefectures is empty', () => {
    const selectedPrefectures: string[] = [];
    const prefecture = 'Kyoto';
    expect(getSelectedPrefectureColor(prefecture, selectedPrefectures)).toBe(
      '#d9d9d9'
    );
  });
});
