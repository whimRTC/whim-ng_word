# YesNo ゲーム

## 概要
wh.im上で遊べる NGワードゲームのソースコードです。
自由に使っていただいてかまいません。
(魔改造して、whimに登録しても大丈夫ですw)

## gitのクローン
``` 
git clone git@github.com:whimRTC/whim-ng_word.git
```

## 起動
``` 
yarn
yarn serve
``` 

## 起動(Docker)
```
docker build --tag app:latest . 
docker run -it -v $PWD:/app -p 3001:3001 app:latest
```

## ドキュメント・質問
実装を見てわからないところがあれば、ドキュメントを確認してみてください！
- https://docs.wh.im/developer
またわからないところがあれば、質問も大歓迎です！
- https://groups.google.com/forum/?hl=ja#!forum/whim-developer
