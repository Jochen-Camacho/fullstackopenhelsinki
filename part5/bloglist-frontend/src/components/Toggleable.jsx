import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';

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
      {!visible && <button onClick={toggleVisibility}>{label}</button>}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
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
