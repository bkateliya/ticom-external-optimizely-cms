import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationCategoryListClient } from "../ApplicationCategoryListClient";

const columns: Parameters<typeof ApplicationCategoryListClient>[0]["columns"] = [
  [
    {
      id: 1,
      text: "Aerospace",
      lid: "Aerospace",
      href: "/en-us/applications/aerospace",
      children: [
        { id: 11, text: "Avionics", lid: "Avionics", href: "/en-us/a/avionics" },
      ],
    },
  ],
  [
    {
      id: 2,
      text: "Building automation",
      lid: "Building automation",
      href: "/en-us/applications/building",
      children: [
        { id: 21, text: "HVAC", lid: "HVAC", href: "/en-us/a/hvac" },
      ],
    },
  ],
  [{ id: 3, text: "Data center", lid: "Data center", href: "/en-us/dc", children: [] }],
];

test("expand all toggles every collapsible and flips the label", async () => {
  const user = userEvent.setup();
  render(
    <ApplicationCategoryListClient
      columns={columns}
      heading="Browse applications"
      expandAllLabel="Expand all"
      collapseAllLabel="Collapse all"
      learnMoreLabel="Learn more"
    />,
  );

  expect(screen.getByText("Browse applications")).toBeInTheDocument();
  // Flat link (no children) renders as a plain anchor.
  expect(screen.getByRole("link", { name: "Data center" })).toHaveAttribute(
    "href",
    "/en-us/dc",
  );

  const triggers = screen.getAllByRole("button", { expanded: false });
  expect(triggers).toHaveLength(2);

  await user.click(screen.getByRole("button", { name: /Expand all/ }));
  expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(2);
  expect(screen.getByRole("button", { name: /Collapse all/ })).toBeVisible();
  // "Learn more" back-link per expanded group.
  expect(screen.getAllByRole("link", { name: "Learn more" })).toHaveLength(2);

  await user.click(screen.getByRole("button", { name: /Collapse all/ }));
  expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(2);
});

test("expanding every group one by one flips the label too", async () => {
  const user = userEvent.setup();
  render(
    <ApplicationCategoryListClient
      columns={columns}
      heading="Browse applications"
      expandAllLabel="Expand all"
      collapseAllLabel="Collapse all"
      learnMoreLabel="Learn more"
    />,
  );

  await user.click(screen.getByRole("button", { name: /Aerospace/ }));
  expect(screen.getByRole("button", { name: /Expand all/ })).toBeVisible();
  await user.click(screen.getByRole("button", { name: /Building automation/ }));
  expect(screen.getByRole("button", { name: /Collapse all/ })).toBeVisible();
});
