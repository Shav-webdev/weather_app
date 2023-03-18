import { useContext } from 'react';
import { TemperatureContext } from 'contexts/TemperatureContext';

const TempToggle = () => {
  const { temperature, setTemperature } = useContext(TemperatureContext);

  const handleTempChange = () => {
    const isCurrentKelvin = temperature === 'kelvin';
    setTemperature(isCurrentKelvin ? 'celsius' : 'kelvin');
    localStorage.setItem(
      'default-temp',
      isCurrentKelvin ? 'kelvin' : 'celsius',
    );
  };

  return (
    <div className="toggle-btn-section">
      <div className={`toggle-checkbox m-vertical-auto`}>
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="checkbox"
          onChange={handleTempChange}
          checked={temperature === 'kelvin'}
        />
        <button
          type="button"
          className={`toggle-btn__input-label ${temperature}`}
          onClick={handleTempChange}
        >
          <span className={'temp-type'}>
            {temperature === 'celsius' ? 'K' : '°C'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TempToggle;
