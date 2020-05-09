# Warehouse UI

## Menu

![Menu](./public/img/menu.jpg)

from src/grpc/proto:

```
protoc -I=. * --js_out=import_style=commonjs:../generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../generated
```
