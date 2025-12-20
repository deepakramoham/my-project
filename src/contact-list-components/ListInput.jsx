import { useState, useRef } from "react";

function ListInput({ addStudent }) {
  const contactRef = useRef(null);
  console.log("list input rendering");
  const [name, setName] = useState("abc");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    const contact = contactRef.current.value;
    const newStudent = {
      id: crypto.randomUUID(),
      name,
      contact,
    };
    addStudent(newStudent);
  };

  return (
    <>
      {/*Controlled Component*/}

      {/* A controlled component is an input where React state controls the value, making React the single source of truth. */}
      {/* 
      Controlled Component:
      React fully manages the input’s value through state.
      Provides real-time validation, conditional UI updates, and predictable behavior.
      Every keystroke triggers state updates → component re-renders.
      Best choice when you need form validation, dynamic error messages, or tight UI control.
      */}
      <input
        value={name}
        placeholder="Enter your name"
        onChange={handleInputChange}
      />

      {/*

      Uncontrolled Component

      This input uses `defaultValue`, so the browser (DOM) controls the text shown.
      There is NO onChange handler and NO state update.
      The component does NOT re-render on every keystroke.
  
      Limitations:
      Real-time error validation is not possible because React is not receiving updates.
      React does not know the value until we manually read it.

      Benefits:
      Better performance for large or complex forms.
      Using useRef gives direct access to the actual DOM element to read/update the value when needed.

      */}

      <input
        ref={contactRef}
        // defaultValue={"00000000"}
        placeholder="Contact Number . . ."
      />

      {/*
      Hybrid Input (Uncontrolled visually + Controlled logically)

      Uses `defaultValue`, so the browser controls the visible text.
      React does NOT control or update the displayed value.

      Still uses `onChange` to update React state.
      Component re-renders on every keystroke, even though React is not
      the source of truth for the input's value.

      Why this pattern is problematic:
      Two sources of truth (DOM shows the value, state stores a copy).
      Resetting state will NOT reset the input visually.
      Real-time validation becomes inconsistent or unreliable.

      When this pattern is acceptable:
      Rare cases where the DOM/input must fully control its own behavior
      (formatting, auto-correct, custom widgets), but you still want
      React to receive the value for side-effects or analytics.

      Summary:
      Technically an uncontrolled input, but with unnecessary re-renders.
      Avoid unless you have a specific reason to mix both behaviors.
  */}

      {/* <input
        defaultValue={"abcd"}
        onChange={handleInputChange}
        placeholder="enter something . . . "
      /> */}

      <button onClick={handleSubmit}>Add</button>
    </>
  );
}

export default ListInput;
