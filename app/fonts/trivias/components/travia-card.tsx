"use client";
import { Travia } from "@/types/travia";
import { useState } from "react";
import { string } from "zod";

interface TraviaCardProps {
  travia: Travia;
}

const shuffleAnswers = (correct_answer: string, incorrect_answer: string[]) => {
  const answers = [...incorrect_answer, correct_answer];
  return answers.sort(() => Math.random() - 0.5);
};

const TraviaCard = ({ travia }: TraviaCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const answers = shuffleAnswers(
    travia.correct_answer,
    travia.incorrect_answers,
  );

  const handleClick = (answer: string) => {};
  return <div>TraviaCard</div>;
};

export default TraviaCard;
