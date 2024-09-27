import { useState } from "react";

const symbols = ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍒", "🍍"];
const shuffleSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

function App() {
  const [blocks, setblocks] = useState(
    shuffleSymbols.map((symbol) => ({ symbol, reveal: false, matched: false })),
  );
  // const [firstPick, setFirstPick] = useState(null);
  // const [secondPick, setSecondPick] = useState(null);

  function revealBlock(index) {
    if(!blocks[index].reveal && !blocks[index].matched)
    setblocks((prevBlocks) =>
      prevBlocks.map((block, i) =>
        i === index ? { ...block, reveal: true } : block,
      ),
    );
  }

  return (
    <div className="flex flex-col justify-center bg-slate-800 text-white min-h-screen w-full">
      <h1 className="text-center text-3xl">Ruch gracza 1</h1>
      <div className="grid grid-cols-[repeat(4,_minmax(100px,150px))] gap-4 place-content-center mx-auto px-4 w-full max-w-[1200px] mt-16">
        {blocks.map((block, index) => (
          <div
            className="p-8 text-center grid place-content-center text-[2rem]  bg-emerald-500 rounded-lg cursor-pointer"
            onClick={() => revealBlock(index)}
            key={index}
          >
            {block.reveal || block.matched ? block.symbol : "❓"}
          </div>
        ))}
      </div>
      <span className="text-center">
        <button
          className="mt-10 py-4 px-8 bg-sky-600 text-xl rounded-lg"
          onClick={() => setblocks()}
        >
          Reset
        </button>
      </span>
      <div className="text-center mt-5 text-4xl">
        <p className="mb-5">
          Player 1: <span>0</span>
        </p>
        <p>
          Player 2: <span>0</span>
        </p>
      </div>
    </div>
  );
}

export default App;
