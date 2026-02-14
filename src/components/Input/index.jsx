import { memo, forwardRef } from "react";

const Input = memo((props) => {
  return (
    <div>
      {props?.label ? (
        <div>
          <label htmlFor={props?.name}>
            {props?.label}
            <span style={{ color: "red" }}>*</span>
          </label>
        </div>
      ) : (
        <div />
      )}
      <div>
        <input
          id={props?.name}
          name={props?.name}
          ref={props?.ref}
          value={props?.value}
          type={props?.type}
          placeholder={props?.placeholder}
          onChange={props?.onChange}
          className={`form-control ${props?.className || ""}`}
          style={props?.style || {}}
        />
      </div>

      <div className="text-danger">{props?.error}</div>
    </div>
  );
});
export default Input;
