import React, { useState, useRef } from 'react';
import './Cli.css'
import Chart from './Chart';
 
const executeCommand = (command) => {
    if (command === "help") {
        return `Available commands:
      - help: Show available commands
      - about: Display information about this CLI
      - fetch-price [coin]: Fetch the current price of a specified cryptocurrency
      - upload: Opens the file explorer to allow uploading csv files only.
      - draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory. `;
    }
    else if (command === "about") {
        return `CLI Version 1.0
      This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities.`;
    }
    else if (/^fetch-price [A-Z]+$/.test(command)) {
        let symbol = command.split(' ');
        return fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol[1]}`)
            .then(response => response.ok && response.json())
            .then(data => `The current price of ${symbol[1]} is ${data.price}`)
            .catch(err => err)

    } else if (command === 'upload') {
        const inputElement = document.createElement('input');
        inputElement.setAttribute('id', 'uploadInput');
        inputElement.type = 'file';
        inputElement.click();
        return new Promise((resolve, reject) => {
            inputElement.addEventListener('change', (event) => {
                const selectedFile = event.target.files[0];

                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    fetch('http://localhost:3001/upload', {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => {
                            if (response.ok) {
                                return response.text();
                            } else {
                                reject('File upload failed.');
                            }
                        })
                        .then((message) => {
                            resolve(message);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            });
        });
        // document.removeEventListener('change',inputElement); 
    }
    else if (/^delete [^.\s]+(\s[^.\s]+)*\.[^\s]+$/.test(command)) {
        const chunks = command.split(' ');   
        const fileName = chunks.slice(1).join(' ');  
        console.log(fileName)
        return fetch(`http://localhost:3001/delete/${fileName}`, {
            method: 'POST'
        }).then(response => response.ok && response.text()).then(message => message).catch(err => err);
    }
    else if(command.startsWith('draw'))
    {
        const dotIndex=command.indexOf('.');
        const chunks =  [command.slice(0,dotIndex),command.slice(dotIndex+1)]
      
        const columns=chunks[1].split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)/);
        const fileName=chunks[0].split(' ').slice(1).join(' ')+'.'+columns[0];
        columns.shift();console.log(chunks);console.log(columns)
        let url=`http://localhost:3001/drawChart?fileName=${fileName}`;
        columns.map(col=>url+='&columns='+encodeURIComponent(col));
        console.log(url)
         return fetch(url)
         .then(response=>response.ok && response.json())
         .then(data=>data)
         .catch(err=>err)
    //draw Solana Historical Data.csv col1 col2 col3 
    }
    else {
        return `Unknown command: ${command}. Type 'help' for a list of commands.`;
    }
};

const Cli = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);
    const [chartData,setChartData]=useState(null);
    const inputRef = useRef();

    const handleInputChange = (e) => {
        setChartData(null);
        setInput(e.target.value);
    };

    const handleEnter = async () => {
        if (input === 'clear') {
            setOutput([]);
            setInput("");

        }
        else { 
            const newOutput = [...output, `${input}`];  
            if(input.startsWith('draw'))
            {
                const response = await executeCommand(input);
                console.log('reponse is :', response)
                
                if(response)
                {
                    newOutput.push(`Drawing chart based on [file]...
                    Chart drawn successfully.`);
                    setChartData(response);
                    setOutput(newOutput);
                }
                else
                {
                    newOutput.push("File doesnot exists on server");
                    setChartData(null);
                    setOutput(newOutput);
                }
                
                
            }
            else
            {
                const response = await executeCommand(input);
                console.log('reponse is :', response)
                newOutput.push(response);
                setOutput(newOutput);
            }  

            setInput("");  
        }
    };

    return (
        <div
            className="cli"
            onClick={() => {
                inputRef.current.focus();
            }}
        >
        <div>
            <h4 style={{textAlign:'center',fontSize:'larger'}}>AnteMatter.io Fullstack Challenge</h4>
        </div>
            <div>
                <pre role='output'>{output.join("\n")}</pre>
             
            </div>
            
            {chartData && <Chart data={chartData}/>}
            <div className="container">
                <div className="input-prompt" style={{ marginRight: "4px" }}>
                    {">"}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleEnter();
                           else if(e.key==='ArrowUp') {   output.length>=2 && setInput(output[output.length-2])}
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Cli;
