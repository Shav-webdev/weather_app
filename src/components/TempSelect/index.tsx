import React, { useContext } from 'react';
import Select, { SingleValue } from 'react-select';
import { TemperatureContext } from '../../contexts/TemperatureContext';
import { IObjectKeys } from '../../helpers/global.types';

const options = [
  { value: 'kelvin', label: 'Kelvin' },
  { value: 'celsius', label: 'Celsius' },
  { value: 'fahrenheit', label: 'Fahrenheit' },
];

const TempSelect = () => {
  const { setTemperature } = useContext(TemperatureContext);

  const colourStyles = {
    control: (styles: IObjectKeys) => ({
      ...styles,
      backgroundColor: '#efefef',
    }),
    menu: (styles: IObjectKeys) => ({
      ...styles,
      backgroundColor: '#efefef',
    }),
    option: (
      styles: IObjectKeys,
      {
        isDisabled,
        isFocused,
        isSelected,
      }: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean },
    ) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? '#ccc' : '#efefef',
        color: '#000',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  const handleTempChange = (
    option: SingleValue<{
      value: string;
      label: string;
    }>,
  ) => {
    if (!option) return;
    setTemperature(option.value as 'kelvin' | 'celsius' | 'fahrenheit');
    localStorage.setItem('default-temp', option.value);
  };

  return (
    <div style={{ width: '230px' }}>
      <Select
        placeholder={'Select measurement'}
        onChange={handleTempChange}
        options={options}
        styles={colourStyles}
      />
    </div>
  );
};

export default TempSelect;
