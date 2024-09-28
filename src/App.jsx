import { useState } from "react";

const symbols = ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍒", "🍍"];
const shuffleSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

function App() {
  const [blocks, setblocks] = useState(
    shuffleSymbols.map((symbol) => ({ symbol, reveal: false, matched: false })),
  );
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [isComparing, setIsComapring] = useState(false);
  const [points, setPoints] = useState(0);

  function handleBlockClick(index) {
    if (isComparing || blocks[index].reveal || blocks[index].matched) return;

    setblocks((prevBlocks) =>
      prevBlocks.map((block, i) =>
        i === index ? { ...block, reveal: true } : block,
      ),
    );

    if (firstPick === null) {
      setFirstPick(index);
    } else if (secondPick === null) {
      setSecondPick(index);
      setIsComapring(true);
      compareBlocks(firstPick, index);
    }
  }

  function compareBlocks(first, second) {
    let newBlocks;
    if (blocks[first].symbol === blocks[second].symbol) {
      newBlocks = blocks.map((block, i) =>
        i === first || i === second ? { ...block, matched: true } : block,
      );
      setPoints((prevPoints) => prevPoints + 1);
      updateState(newBlocks);
    } else {
      newBlocks = blocks.map((block, i) =>
        i === first || i === second ? { ...block, reveal: false } : block,
      );
      setTimeout(() => {
        updateState(newBlocks);
      }, 1000);
    }
  }

  function updateState(newBlocks) {
    setblocks(newBlocks);
    setIsComapring(false);
    setFirstPick(null);
    setSecondPick(null);
  }

  if (points === symbols.length) {
    alert("You win! Click the restart button");
  }

  return (
    <div className="flex flex-col justify-center bg-slate-800 text-white min-h-screen w-full">
      <h1 className="text-center block sm:hidden">
        This game is not designed for smartphones, please play on a computer or
        tablet{" "}
      </h1>
      <div className="hidden sm:block">
        <h1 className="text-center text-3xl">Memory game</h1>
        <div className="grid grid-cols-[repeat(4,_minmax(100px,150px))] gap-6 place-content-center mx-auto px-4 w-full max-w-[1200px] mt-16">
          {blocks.map((block, index) => (
            <div
              className={`p-8 text-center grid transition-all place-content-center text-[2rem]  bg-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-400 ${block.reveal || block.matched ? "scale-110 bg-slate-400 hover:bg-slate-400" : ""}`}
              onClick={() => handleBlockClick(index)}
              key={index}
            >
              {block.reveal || block.matched ? block.symbol : "❓"}
            </div>
          ))}
        </div>
        <span className="block text-center">
          <button
            className="mt-10 py-4 px-8 bg-sky-600 text-xl rounded-lg transition-colors hover:bg-sky-500"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </span>
        <div className="text-center mt-5 text-4xl">
          <p className="mb-5">
            Points: <span>{points}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
