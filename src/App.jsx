import ListData from "./contact-list-components/ListData";
import ListInput from "./contact-list-components/ListInput";

function App() {
  console.log("app rendered");
  return (
    <>
      <div className="container">
        <div className="outer-container">
          <ListInput />
          <ListData />
        </div>
      </div>
    </>
  );
}

export default App;
