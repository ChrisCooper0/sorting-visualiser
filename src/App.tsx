import { useEffect } from "react";
import Slider from "./components/Input/Slider";
import { useSortingAlgorithmContext } from "./context/Visualiser";
import "./index.css";
import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from "./lib/utils";

function App() {
  const { arrayToSort, isSorting, animationSpeed, setAnimationSpeed } =
    useSortingAlgorithmContext();

  return (
    <main className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="flex h-full justify-center">
        <div
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
          id="content-container"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-grey-300 text-2xl hidden md:flex font-light">
              Sorting Visualiser
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Slider
                min={MIN_ANIMATION_SPEED}
                max={MAX_ANIMATION_SPEED}
                step={10}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
                isDisabled={isSorting}
              />
            </div>
          </div>
          <div className="relative h-[calc(100vh - 66px) w-full">
            <div className="abolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
