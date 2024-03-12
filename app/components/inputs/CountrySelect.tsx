// Trong CountrySelect.tsx
import React from 'react';
import Select from 'react-select';

export type CountrySelectValue = {
    value: string,
}

type CountrySelectProps = {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue | null) => void;
}

const vietnamProvinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
];

const options = vietnamProvinces.map((province) => ({
    label: province,
    value: province,
}));

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            onChange(selectedOption as CountrySelectValue);
        } else {
            onChange(null);
        }
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={handleChange}
            placeholder="Anywhere"
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6'
                }
            })}
        />
    );
}

export default CountrySelect;
