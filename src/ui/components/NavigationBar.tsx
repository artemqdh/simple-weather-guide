import React from 'react';

interface NavigationBarProps
{
    onChangePage: (page: 'today' | 'forecast') => void;
}

const NavigationBar: React.FunctionComponent<NavigationBarProps> = ({ onChangePage }) =>
{
    const handleButtonClick = (page: 'today' | 'forecast') =>
    {
        onChangePage(page);
    };

    return (
        <div className="w-100 bg-dark my-2">
            <input type="radio" className="btn-check" name="options-base" id="option5" autoComplete="off" onChange={() => handleButtonClick('today')} defaultChecked/>
            <label className="btn ms-3 px-3 py-2 text-white" htmlFor="option5">
                Today
            </label>

            <input type="radio" className="btn-check" name="options-base" id="option6" autoComplete="off" onChange={() => handleButtonClick('forecast')}/>
            <label className="btn px-3 py-2 text-white" htmlFor="option6">
                5-day forecast
            </label>
        </div>
    );
};

export default NavigationBar;
