const updateDisabled = (
  key: string,
  newValue: any,
  setViewTableObject: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setViewTableObject(prev =>
    prev.map(item =>
      item.inputKey === key ? { ...item, disabled: newValue } : item,
    ),
  );
};

export default updateDisabled;
