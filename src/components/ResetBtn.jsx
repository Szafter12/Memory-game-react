export function ResetBtn() {
  return (
    <span className="block text-center">
      <button
        className="mt-10 py-4 px-8 bg-sky-600 text-xl rounded-lg transition-colors hover:bg-sky-500"
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
    </span>
  );
}
