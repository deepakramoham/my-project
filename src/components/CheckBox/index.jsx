const Checkbox = ({
  options,
  label,
  selectedValues,
  handleInputChange,
  name,
  className,
}) => {
  return (
    <>
      <div>
        <span>
          {label}
          <span style={{ color: "red" }}>*</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {options?.map((opt) => (
          <div
            key={opt.value}
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <div>
              <input
                id={opt.value}
                name={name}
                type="checkbox"
                value={opt.value}
                checked={selectedValues?.includes(opt.value)}
                onChange={handleInputChange}
                className={`form-check-input ${className || ""}`}
              />
            </div>
            <div>
              <label htmlFor={opt.value} className="form-check-label">
                {opt.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Checkbox;
