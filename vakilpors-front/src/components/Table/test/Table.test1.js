import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from '../Table';


//test block
test("table basic test", () => {
    // render the component on virtual dom
    render(<Table lazyParams={{ first: 0, rows: 10, page: 1, sortField: "Name", sortOrder: "true"}}/>);
    
    //select the elements you want to interact with
    // get the MultiSelect element and click on it
    const multiSelect = screen.findByPlaceholderText("نمایش ستون‌ها");

    // get the checkbox elements and click on the ones you want to select
    const nameCheckbox = screen.getByText("نام و نام خانوادگی");
    const emailCheckbox = screen.getByText("ایمیل");


    // assert that the selected columns are rendered in the table
    expect(screen.getByText("نام و نام خانوادگی")).toBeInTheDocument();
    expect(screen.getByText("ایمیل")).toBeInTheDocument();
    expect(screen.getByText("نام‌کاربری")).toBeInTheDocument();
    expect(screen.getByText("شماره تماس")).toBeInTheDocument();
    expect(screen.getByText("نقش")).toBeInTheDocument();
});