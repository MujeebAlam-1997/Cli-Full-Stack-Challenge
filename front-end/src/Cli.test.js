import { render, screen,fireEvent } from '@testing-library/react';
import Cli from './Cli';

test('renders cli', () => {
render(<Cli/>);

const linkElement = screen.getByText(/AnteMatter.io Fullstack Challenge/i);
expect(linkElement).toBeInTheDocument();
})

test('draw a file with columns which doesnot exist', async()=>{
    render(<Cli/>)
    const inputElement = screen.getByRole('textbox'); // Assuming it's a text input
  const inputValue = 'draw xyz.csv x2 x4 x4';
 
  fireEvent.change(inputElement, { target: { value: inputValue } });
 
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });

  const outputElement = screen.getByRole("output").textContent;
 setTimeout(() => { 
  expect(outputElement).toContain('File doesnot exists on server')
    
}, 4000);
  
})

test('delete a file which doesnot exists',()=>{
    render(<Cli/>)
    const inputElement = screen.getByRole('textbox'); // Assuming it's a text input
    const inputValue = 'delete xyz.csv';
   
    fireEvent.change(inputElement, { target: { value: inputValue } });
   
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
    const outputElement=screen.getByRole('output').textContent;

    setTimeout(() => {
        expect(outputElement).toBeInTheDocument('File "xyz.csv" not found');
    }, 4000); 
   

})
 

test('handles "help" command', async () => {
  render(<Cli />);
  const inputElement = screen.getByRole('textbox');
  const outputElement = screen.getByRole('output').textContent;

  fireEvent.change(inputElement, { target: { value: 'help' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13 });

  setTimeout(() => { 
    expect(outputElement).toContain('Available commands:');
    
}, 3000);

});

test('handles "about" command', async () => {
  render(<Cli />);
  const inputElement = screen.getByRole('textbox');
  const outputElement = screen.getByRole('output').textContent;

  fireEvent.change(inputElement, { target: { value: 'about' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13 });
 
  setTimeout(() => {
    expect(outputElement).toContain('CLI Version 1.0');
  }, 3000);
  
});

test('handles "unknown command"', async () => {
  render(<Cli />);
  const inputElement = screen.getByRole('textbox');
  const outputElement = screen.getByRole('output').textContent;

  fireEvent.change(inputElement, { target: { value: 'nonexistent' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13 });

  setTimeout(() => {
        expect(outputElement).toContain('Unknown command:');
  }, 3000);
  
});

// Add more test cases for other commands as needed
