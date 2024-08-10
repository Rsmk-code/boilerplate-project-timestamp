import express, { response } from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use('/public', express.static(path.join(__dirname, 'public')))


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (req,res)=>{
  let dateInput = req.params.date;

  let date;
  if (!dateInput) {
    date = new Date();
  } else {
    if (!isNaN(dateInput)){
      dateInput = parseInt(dateInput);
    }
    date = new Date(dateInput)
  }

  if (date.toString()=== 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  const responseObject = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
  res.json(responseObject)
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3001
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
