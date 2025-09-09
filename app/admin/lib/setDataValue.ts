const setDataValue = (
  e: any,
  setFunc: React.Dispatch<React.SetStateAction<string>>,
) => {
  const newValue = e.target.value;
  setFunc(newValue);
};

export default setDataValue;
