import React from "react";
import { QuestionSet } from "../Pages/Questions";

interface QuestionSetListItemProps extends QuestionSet {}

export default function QuestionSetListItem(props: QuestionSetListItemProps) {
  return <div>{props.title}</div>;
}
