const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={`${type === "error" ? "error" : "message"}`}>{message}</div>
  );
};

export default Notification;
