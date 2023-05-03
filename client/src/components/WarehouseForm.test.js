import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WarehouseForm from './WarehouseForm';

describe('WarehouseForm', () => {
  test('it renders a form with warehouse input field', () => {
    const { getByLabelText } = render(<WarehouseForm />);
    const warehouseNameInput = getByLabelText('Warehouse Name:');
    expect(warehouseNameInput).toBeInTheDocument();
  });

  test('it adds a shelf to the form when "Add Shelf +" is clicked', () => {
    const { getByText, getAllByLabelText } = render(<WarehouseForm />);
    const addShelfButton = getByText('Add Shelf +');
    fireEvent.click(addShelfButton);
    const shelfNameInputs = getAllByLabelText('Shelf Name:');
    const shelfZoneInputs = getAllByLabelText('Warehouse Zone:');
    expect(shelfNameInputs.length).toBe(1);
    expect(shelfZoneInputs.length).toBe(1);
  });

  it("should delete a shelf when clicking on 'Delete' button", () => {
    const { getByText, queryByText } = render(<WarehouseForm />);
    const addShelfButton = getByText("Add Shelf +");
    fireEvent.click(addShelfButton);
    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);
    expect(queryByText("Shelf Name:")).not.toBeInTheDocument();
  });
});