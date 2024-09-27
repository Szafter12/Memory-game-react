export function Grid() {
  return (
    <div className="grid grid-cols-[repeat(4,_minmax(100px,150px))] gap-4 place-content-center mx-auto px-4 w-full max-w-[1200px] mt-16">
      <div className="p-8 text-center grid place-content-center text-[2rem]  bg-emerald-500 rounded-lg cursor-pionter">
        ❓
      </div>
    </div>
  );
}
