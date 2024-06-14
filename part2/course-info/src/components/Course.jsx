import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((s, p) => s + p.exercises, 0)} />
    </div>
  );
};

export default Course;
