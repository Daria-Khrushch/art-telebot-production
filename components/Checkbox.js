import { useEffect, useState } from 'react';

const Checkbox = ({ id, label, onChange, channel="" }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (channel === "") {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }, [])

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked);
  };

  return (
    <div className="flex items-start mb-4 mt-3 lg:mt-0">
      <input
        id={id}
        type="checkbox"
        className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="text-m ml-3 font-medium">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
