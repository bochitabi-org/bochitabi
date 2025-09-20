# 一人でたびにでるもんアプリ
一人旅行向けアプリ。一人は寂しくない。楽しい。；；

## 設計
- 仕様：[notion](https://www.notion.so/266654d0a580809ca109c35db80a1470)
全体仕様についてはnotionで管理する

- デザイン:[miro](https://miro.com/app/board/uXjVJLDgNRw=/)
ユーザーストーリーマッピングやフロントデザインなで利用する。
基本的にはnotion側で管理するため、こちらは必要なもの以外は雑多なアイデアの書きなぐりの情報が載る可能性がある。

その他必要に応じて外部ツールの採用を考える
例）storybookなど

## 構成
```
- backend: 
    - Go(Gin)
    - PostgreSQL
- frontend: 
    - React Native (Expo)
```

## 開発時ルール
### ブランチ管理
ブランチは以下のルールで派生させて管理する
- 🚀：機能開発 `feature`ブランチから派生利用
- ✨：機能改善 `refactor`ブランチから派生利用
- 🐛：バグ修正 `bugfix`ブランチから派生

開発時は基本的にdevelopブランチにマージしていく

```bash 
merge : `working branch` -> `develop branch`
```
### 課題管理
`github issue`を利用してプロジェクトの課題管理、機能開発を進める。
ブランチ名はissueで採番される番号を利用するため、
基本的には1. issueを作成→2. ブランチ作成 の順序で開発を進める
PRが承認されてマージが完了した際には適宜issueをcloseする。

## 前提条件
/backend, /frontendのREADMEを参照