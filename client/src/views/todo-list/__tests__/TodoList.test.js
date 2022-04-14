import React from "react";
import { render } from "@testing-library/react";
import List from "../components/list";
import Ongoing from "../components/ongoingList";

test("Renders List Correctly", () => {
  const { getByText } = render(<List lists={[{ title: "test", id: "1" }]} />);
  const linkElement = getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

test("Render Empty List Text", () => {
  const { getByText } = render(<Ongoing lists={[]} />);
  const linkElement = getByText(/Yeay, semua telah selesai!/i);
  expect(linkElement).toBeInTheDocument();
});
