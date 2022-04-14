import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("Renders Card Children Corrently", () => {
  const { getByText, container } = render(
    <Card className="mx-auto">
      <p>ini children card</p>
    </Card>
  );
  const linkElement = getByText(/ini children card/i);
  expect(linkElement).toBeInTheDocument();
});

test("Adding Class List To Card", () => {
  const { container } = render(<Card className="mx-auto" />);

  const classList = container.firstChild.classList;
  expect(classList.contains("mx-auto")).toBe(true);
});
