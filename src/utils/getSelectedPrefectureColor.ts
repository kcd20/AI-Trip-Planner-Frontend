const getSelectedPrefectureColor = (
  prefecture: string,
  selectedPrefectures: string[]
): string => {
  if (selectedPrefectures.includes(prefecture)) {
    return '#1976d2';
  }
  return '#d9d9d9';
};

export default getSelectedPrefectureColor;
