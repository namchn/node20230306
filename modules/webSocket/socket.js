const webSocket = require("ws"); //외부라이브러리

let sockets = []; //연결된 소켓들을 담을 배열
module.exports = (server) => {
  //웹소켓 기능 구현
  const wss = new webSocket.Server({ server }); //express 서버와 포트 공유하기
  //const wss = new webSocket.Server({port:3001})

  //웹소켓에서는 이벤트로 내용을 처리
  //임의로 이벤트명을 지정할 수도 있지만 ,기본적으로 가지고 있는 이벤트명도 존재
  //커넥션이 일어나는 시점을 잡이사 코딩하기
  wss.on("connection", (ws, req) => {
    // ws 안에는 연결된 클라이언트의 정보가 담겨있다.
    //req에는 처음 커넥션을 맺었을 때의 요청헤더 정보가 담겨있다.
    //console.log(req.connction.remoteAddress);
    console.log(req.connction);

    ws.id = req.headers["sec-websocket-key"];
    // sec-wevsocket-key 를 통해 웹소켓 식별
    sockets.push(ws);
    //연결이 될 때마다 sockets 배열에 소켓을 넣어준다.

    ws.on("close", (code, reason) => {
      //code :연결이 종료되는 이유를 가르키는 숫자
      //기본값은 1000
      //reason : 왜 종료되는지 사람이 읽을 수 있도록 나타내는 문자열
      //utf-8 포멧 123바이트를 넘을 수 없다.

      console.log("도망쳤다!");
      sockets = sockets.filter((v) => {
        console.log(ws.id == v.id);
        return ws.id != v.id;
      });
      console.log(sockets.length);
      //sockets 배열의 length를 통해 연결이 끊긴 것을 확인 할 수 있다.
    });

    //브라우저로부터 온 메세지 받기
    ws.on("message", (response) => {
      let obj = JSON.parse(response.toString());
      let { type, data, name } = obj;

      switch (type) {
        case "send_msg":
          //sockets.forEach((v) => v.send(data));
          sockets.forEach((v) => v.send(response.toString()));
          break;
      }
    });
  });
};

//"connection"/onconnection : 커넥션이 맺어졌을 때 발생하는 이벤트
//"message"/onmessage :데이터를 수신했을 때 발생하는 이벤트
//"error"/onerror : 에러가 생겼을 때 발생하는 이벤트
//"close"/onclose : 커넥션이 종료되었을 때 발새앟는 이벤트

//ws.send() 메소드를 사용해서 클라이언트에게 데이터를 전달.
//ws.on() 메소드를 사용해서 클라이엍드로부터 온 데이터를 수신.
