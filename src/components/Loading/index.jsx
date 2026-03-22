const Loading = () => {
  return (
    <div
      className="text-center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
      }}
    >
      <div
        className="spinner-border"
        style={{
          height: "120px",
          width: "120px",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
