const updateNotInPayload = (
  key: string,
  newValue: any,
  setViewTableObject: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  setViewTableObject(prev =>
    prev.map(item =>
      item.inputKey === key ? { ...item, notInPayload: newValue } : item,
    ),
  );
};

export default updateNotInPayload;
