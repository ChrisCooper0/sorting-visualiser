import { createContext, useContext, useEffect, useState } from "react";
import { SortingAlgorithmType } from "../lib/types";
import {
  generateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from "../lib/utils";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelectedAlgorithm: (alorithm: SortingAlgorithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: () => void;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);

  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  useEffect(() => {
    resetArrayAndAnimation();

    window.addEventListener("resize", resetArrayAndAnimation);

    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;

    const tempArr: number[] = [];
    const numLines = contentContainerWidth / 8;

    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);

    for (let i = 0; i < numLines; i++) {
      tempArr.push(generateRandomNumberFromInterval(100, maxLineHeight - 100));
    }

    setArrayToSort(tempArr);
    setIsAnimationComplete(false);
    setIsSorting(false);
  };
  const runAnimation = () => {};

  const value = {
    arrayToSort,
    setArrayToSort,
    isAnimationComplete,
    setIsAnimationComplete,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    resetArrayAndAnimation,
    runAnimation,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);
  if (!context) {
    throw new Error(
      "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
    );
  }
  return context;
};
