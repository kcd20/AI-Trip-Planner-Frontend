const getSelectedPrefectureColor = (
  prefecture: string,
  selectedPrefectures: string[]
): string => {
  if (selectedPrefectures.includes(prefecture)) {
    return '#6f9c76';
  }
  return '#d9d9d9';
};

export default getSelectedPrefectureColor;
