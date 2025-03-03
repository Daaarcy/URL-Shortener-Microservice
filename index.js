require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const originalUrl = req.body.url;

  try {
    const urlObject = new URL(originalUrl);
    const hostname = urlObject.hostname;
    
    // Use dns.lookup to verify hostname
    dns.lookup(urlObject.hostname, (err) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      }

  urlDatabase.push({ 
    original_url: originalUrl, 
    short_url: shortUrl
  });

res.json({
  original_url: originalUrl,
  short_url: shortUrl
})

urlIdCounter++;

});
} catch (error) {
  return res.json({ error: 'invalid url' });
}
});

//redirect url
app.get("/api/shorturl/:short_url", function(req, res){
  const shortUrl = Number(req.params.short_url);
  const urlEntry = urlDatabase.find(entry => entry.short_url === shortUrl);

  if (urlEntry){
    return res.redirect(urlEntry.original_url);
  } else {
    return res.json({ error: 'No short URL found for the given input' });
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
