
import { returnText } from "../functions/returnText";
import React from "react";
// import { act } from "react-dom/test-utils";
// import { render } from "@testing-library/react";

const play = {
  penalty: "",
  yards: "",
  penTeam: "",
  playType: "Pass",
  gainLoss: "loss",
  playDist: "1",
  player1: "S. Ehlinger",
  player2: "B. Eagles",
  kicker: "",
  result: "4th",
  afterTD: "",
  min: "1",
  sec: "7",
  quarter: "first",
  kickType: "",
  playCount: {
    $numberInt: "7"
  }
};

describe("returnText function tests", () => {
  it("should return something", () => {
    let result = returnText(play);
    expect(result).toBeTruthy();
  });
  it("to contain last_name", () => {
    let result = returnText(play);
    expect(typeof result).toBe("object");
  });
  it("is p element", () => {
    let result = returnText(play);

    expect(result).toMatchObject({ type: "p" });
  });
  it("contains", () => {
    let result = returnText(play);

    expect.objectContaining(
      <p>
        Pass by S. Ehlinger to B. Eagles with a loss of 1 yards, resulting in a 4th.(01:07)
      </p>
    );
  });
});

