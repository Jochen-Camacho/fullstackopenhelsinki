import StatisticLine from "./StatisticLine";

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  return (
    <div>
      {all === 0 ? (
        <div>
          <br></br>No feedback given
        </div>
      ) : (
        <>
          <h1>statistics</h1>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={`${positive} %`} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Statistics;
