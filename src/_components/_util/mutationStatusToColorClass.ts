import { Mutation } from "@tanstack/react-query";

const colors = {
  purpleMutation: "#D9D6FE",
  purpleMutationText: "#5925DC",
  redMutation: "#fecaca",
  redMutationText: "#b91c1c",
  yellowMutation: "#FEDF89",
  yellowMutationText: "#B54708",
  greenMutation: "#A6F4C5",
  greenMutationText: "#027A48",
  grayMutation: "#eaecf0",
  grayMutationText: "#344054",
};

export const getMutationStatusColors = ({
  status,
  isPaused,
}: {
  status: Mutation["state"]["status"];
  isPaused: boolean;
}) => {
  let backgroundColor, textColor;

  if (isPaused) {
    backgroundColor = colors.purpleMutation;
    textColor = colors.purpleMutationText;
  } else if (status === "error") {
    backgroundColor = colors.redMutation;
    textColor = colors.redMutationText;
  } else if (status === "pending") {
    backgroundColor = colors.yellowMutation;
    textColor = colors.yellowMutationText;
  } else if (status === "success") {
    backgroundColor = colors.greenMutation;
    textColor = colors.greenMutationText;
  } else {
    backgroundColor = colors.grayMutation;
    textColor = colors.grayMutationText;
  }

  return { backgroundColor, textColor };
};
