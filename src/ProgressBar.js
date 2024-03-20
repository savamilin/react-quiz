export default function ProgressBar({
  numOfQestion,
  index,
  answer,
  points,
  maxPossiblePoints,
}) {
  return (
    <header className="progress">
      <progress max={numOfQestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
