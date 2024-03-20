export default function Results({ points, maxPossiblePoints, dispatch }) {
  const precentage = (points / maxPossiblePoints) * 100;
  return (
    <div className="result">
      <p>
        Your score {points} out of {maxPossiblePoints}({Math.ceil(precentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset quiz
      </button>
    </div>
  );
}
