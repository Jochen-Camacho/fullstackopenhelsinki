import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  return (
    <div className={`${type === 'error' ? 'error' : 'message'}`}>{message}</div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
