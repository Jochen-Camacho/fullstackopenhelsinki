import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const Toggleable = forwardRef(({ label, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  useImperativeHandle(
    refs,
    () => {
      return { toggleVisibility };
    },
    [toggleVisibility]
  );

  return (
    <div>
      {!visible && <Button onClick={toggleVisibility}>{label}</Button>}
      {visible && (
        <div>
          {children}
          <Button variant="danger" onClick={toggleVisibility}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Toggleable;
