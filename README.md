# hmr-svcs
Hydra Message Relay Service

A hydra-express microservice which can be used to benchmark HTTP and Websocket based messages sent through Hydra Router.

Requests / messages received by hmr-svcs are echo back and returned to the caller.

## HTTP GET request sent to hydra-router running at port 5353:

```
curl "http://localhost:5353/v1/hmr/relay" \
     -H 'Content-Type: application/json'
```

```
{
  "statusCode": 200,
  "statusMessage": "OK",
  "statusDescription": "Request succeeded without error",
  "result": {
    "from": "hmr-svcs - 8c6a65146a2247218a29eb6a79326c2b"
  }
}
```

## HTTP POST request sent to hydra-router running at port 5353:

```
curl -X "POST" "http://localhost:5353/v1/hmr/relay" \
     -H 'Content-Type: application/json' \
     -d $'{
  "test": "hello"
}'
```

```
{
  "statusCode": 200,
  "statusMessage": "OK",
  "statusDescription": "Request succeeded without error",
  "result": {
    "from": "hmr-svcs - 082a1f5da1094a4fae472dc7ed082c09",
    "body": {
      "test": "hello"
    }
  }
}
```

## Websocket message sent to hydra-router running at port 5353:

```
{
  "to": "hmr-svcs:/",
  "frm": "client:/",
  "mid": "11ae9682-f295-4ff7-92d1-b1242cd349bf",
  "ts": "2018-03-01T03:14:40.249Z",
  "ver": "UMF/1.4.3",
  "bdy": {
    "test":"hello"
  }
}
```

```
{
  "to": "981f2272c2fe42eca590cd6e189c87bc-1fndfm3ykfb@hydra-router:/",
  "frm": "c5e60430c831432592f0770d6bdd73bf@hmr-svcs:/",
  "mid": "e78ecd84-6651-42ae-a965-4d15973113fe",
  "rmid": "11ae9682-f295-4ff7-92d1-b1242cd349bf",
  "ts": "2018-03-05T20:43:52.380Z",
  "ver": "UMF/1.4.6",
  "bdy": {
    "message": "Message reply to mid (11ae9682-f295-4ff7-92d1-b1242cd349bf) by hmr-svcs instance c5e60430c831432592f0770d6bdd73bf"
  }
}
```
