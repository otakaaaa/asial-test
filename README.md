# asial-test
1. 環境構築
```
npm install
```
```
docker-compose up -d --build
```
2. appコンテナへ入る。
```
docker-compose exec app bash
```
3. 以下コマンドを実行。
```
node app/index.js
```