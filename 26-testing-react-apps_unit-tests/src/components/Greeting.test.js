import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe('Greeting Component', () => {
    test('render hello', () => {
        //Arrange
        render(<Greeting/>);

        //Act ... nothing

        //Assert
        const helloElement = screen.getByText('hello', {exact: false});
        expect(helloElement).toBeInTheDocument();
    });
    test('render best react course if the button was not clicked', () => {
        render(<Greeting/>);
        const reactElement = screen.getByText('best react course', {exact: false});
        expect(reactElement).toBeInTheDocument();
    });
    test('render  if the button was clicked', () => {
        render(<Greeting/>);
        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement)
        const outputElement = screen.getByText('changed!');
        expect(outputElement).toBeInTheDocument();
    });
    test('not render best react course if the button was clicked', () => {
        render(<Greeting/>);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        const outputElement = screen.queryByText('best react course', {exact: false});
        expect(outputElement).toBeNull();
    })
});
