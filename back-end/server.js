const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors')
const Papa=require('papaparse')
const port = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'draw-chart/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`${req.file.originalname} uploaded successfully`);
});

app.post('/delete/:fileName', (req, res) => {
    const file = req.params.fileName;
    const filePath = path.join(path.join(__dirname, 'draw-chart'), req.params.fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 

        res.send(`File "${file}" has been deleted.`);
    } else {
        res.send(`File "${file}" not found.`);
    }
})

app.get('/drawChart', (req, res) => {
    const filePath = path.join(path.join(__dirname, 'draw-chart'), req.query.fileName);
    console.log(filePath)
    if(fs.existsSync(filePath)){
    const csvData = fs.readFileSync(filePath, 'utf8');

    Papa.parse(csvData, {
        header: true, 
        dynamicTyping: true, 
        complete: function (results) {
            

            // console.log(results.data);
            const requestedColumns = typeof (req.query.columns) === 'string' ? [req.query.columns] : req.query.columns; // Assuming you pass column names as query parameters
            //  console.log('Columns',requestedColumns)
            if (!requestedColumns) {
                res.status(400).json({ error: 'Columns not specified' });
            }
            const result = results.data.map((row) => {
                const selectedData = {};
                requestedColumns.forEach((column) => {
                    if(column.startsWith("'") && column.endsWith("'") ||
                    column.startsWith('"') && column.endsWith('"'))
                    {
                            column=column.substring(1,column.length-1)
                    } 
                    if (row[column] !== undefined) {
                        selectedData[column] = row[column];
                    }
                });
                return selectedData;
            });
            res.json(result);
        },

    });// papaparse end  
}
else{
    console.log('im here no file detected')
    res.status(500).send('File does not exists...')
}

})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});    