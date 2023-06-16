const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss()
const PORT = 8000

app.ws('/', function (ws, req) {
  console.log("Подлючено")
  ws.send('Ты успешно подключился')
  ws.on('message', (msg) => {
    // console.log(msg)
    aWss.clients.forEach(client => {
      client.send(JSON.parse(msg).message);
    })
  })
})

app.listen(PORT, () => { console.log('listening on port ' + PORT)})