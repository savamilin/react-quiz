export default function NextButton({ answer, dispatch, numOfQestion, index }) {
  if (answer === null) return null;

  if (index < numOfQestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextAnswer" })}
      >
        Next
      </button>
    );

  if (index === numOfQestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Next
      </button>
    );
}
