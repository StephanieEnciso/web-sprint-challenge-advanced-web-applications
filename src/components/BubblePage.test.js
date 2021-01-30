import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {fetchColors as mockFetchColors} from '../api/fetchColors';
jest.mock('../api/fetchColors');

const data = [
  {id: 1, color: 'aqua', code: {hex: '#00ffff'}},
  {id: 2, color: 'blue', code: {hex: '#6093ca'}},
  {id: 3, color: 'lilac', code: {hex: '#9a99dd'}}
]

test("Renders BubblePage without errors", async () => {
  waitFor(() => {<BubblePage/>});
});

test("Fetches data and renders the bubbles on mounting", async () => {
  mockFetchColors.mockResolvedValueOnce(data);
  render(<BubblePage /> );

  const color = screen.findByText(/aqua/i);
  expect(await color).toBeInTheDocument();

});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading