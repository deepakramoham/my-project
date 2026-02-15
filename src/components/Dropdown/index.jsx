const Dropdown = ({
  name,
  label,
  options,
  selectedValue,
  handleInputChange,
}) => {
  return (
    <div>
      <div>{label}</div>
      <select
        /* multiple */ name={name}
        value={selectedValue}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
