import { useState } from "react";

export function GameTable({ blocks, setblocks, setPoints }) {
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [isComparing, setIsComapring] = useState(false);

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

  return (
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
  );
}
