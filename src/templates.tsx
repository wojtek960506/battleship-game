import React from "react";
import { useBoard } from "./contexts/BoardProvider";

type BoardProps = {
  prop1: string;
  prop2: number[]
}

export const Board = ({ prop1, prop2 }: BoardProps) => {
  
  


  return (
    <div>
      
      {prop2}
    </div>
  )
}
