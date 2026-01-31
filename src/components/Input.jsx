import { memo } from "react";
const Input = memo((props) => {
  
  return (
    <>
      <input
        ref={props?.ref}
        name={props?.name}
        className={props?.className}
        value={props?.value}
        placeholder={props?.placeholder}
        onChange={props?.onChange}
      />
      <small style={{ color: "red", height: "10px" }}>{props?.error}</small>
    </>
  );
});

export default Input;
