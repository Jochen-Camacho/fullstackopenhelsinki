import { useDispatch } from 'react-redux';
import { addComment } from '../redux/reducers/blogReducer';
import { useState } from 'react';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const [newCommentData, setNewCommentData] = useState('');
  const { id } = useParams();

  const handleAddComment = async (e) => {
    try {
      e.preventDefault();
      dispatch(addComment(id, newCommentData));
      setNewCommentData('');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comments);

  return (
    <div>
      <h3>Comments</h3>
      <Form
        style={{
          display: 'grid',
          gridTemplateColumns: '4fr 1fr',
          gap: '6px',
          marginBottom: '10px',
        }}
      >
        <Form.Group>
          <Form.Control
            type="text"
            value={newCommentData}
            onChange={(e) => setNewCommentData(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleAddComment}>add comment</Button>
      </Form>

      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Comments;
