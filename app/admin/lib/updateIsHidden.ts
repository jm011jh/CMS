const updateIsHidden = (
  key: string,
  newValue: any,
  setViewTableObject: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setViewTableObject(prev =>
    prev.map(item =>
      item.inputKey === key ? { ...item, isHidden: newValue } : item,
    ),
  );
};

export default updateIsHidden;
