const http = require('http');
const port = 8081;

const server = http.createServer(function(req, res) {

  res.end(
    'ok'
  );
  console.log(req.method);
});

server.listen(port, () => {
  console.log(`Iniciou servidor na porta: ${port}`);
});
