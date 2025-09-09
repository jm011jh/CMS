const updateValue = (
  key: string,
  newValue: any,
  setViewTableObject: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setViewTableObject(prev =>
    prev.map(item =>
      item.inputKey === key ? { ...item, value: newValue } : item,
    ),
  );
};

export default updateValue;
