require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const urlDatabase = [];
let urlIdCounter = 1;

//post url
app.post("/api/shorturl", function(req, res){
  const url = req.body.url;
  const urlRegex = /^(http|https):\/\/[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;

  if (!urlRegex.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  urlDatabase.push({ 
    original_url: url, 
    short_url: urlIdCounter 
  });

res.json({
  original_url: url,
  short_url: urlIdCounter
})

urlIdCounter++;

});

//redirect url
app.get("/api/shorturl/:short_url", function(req, res){
  const shortUrl = Number(req.params.short_url);
  const url = urlDatabase.find(entry => entry.short_url === shortUrl);

  if (url){
    res.redirect(url.original_url);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
