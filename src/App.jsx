import { useState } from "react";
import { Pointer } from "./components/Pointer";
import { ResetBtn } from "./components/ResetBtn";
import { GameTable } from "./components/GameTable";

const symbols = ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍒", "🍍"];
const shuffleSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

function App() {
  const [blocks, setblocks] = useState(
    shuffleSymbols.map((symbol) => ({ symbol, reveal: false, matched: false })),
  );
  const [points, setPoints] = useState(0);

  if (points === symbols.length) {
    alert("You win! Click the restart button");
  }

  return (
    <div className="flex flex-col justify-center bg-slate-800 text-white min-h-screen w-full">
      <h1 className="text-center block sm:hidden">
        This game is not designed for smartphones, please try it on a computer
        or tablet
      </h1>
      <div className="hidden sm:block">
        <h1 className="text-center text-3xl">Memory game</h1>
        <GameTable
          blocks={blocks}
          setblocks={setblocks}
          setPoints={setPoints}
        />
        <ResetBtn />
        <Pointer points={points} />
      </div>
    </div>
  );
}

export default App;
