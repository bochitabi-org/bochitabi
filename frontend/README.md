# Bochitabi Frontend

Bochitabiアプリのフロントエンド部分です。React Native + Expoを使用して開発されています。

## 技術スタック

- **React Native**: 0.81.4
- **React**: 19.1.0
- **Expo**: ~54.0.9
- **TypeScript**: ~5.9.2
- **Biome**: 2.2.4 (リンター・フォーマッター)
- **pnpm**: パッケージマネージャー

## 前提条件

- Node.js (推奨: 18.x以上)
- pnpm
- Expo CLI
- iOS開発の場合: Xcode
- Android開発の場合: Android Studio

## セットアップ

1. 依存関係をインストール
```bash
pnpm install
```

2. Expo CLIをグローバルにインストール（まだの場合）
```bash
npm install -g @expo/cli
```

## 起動方法

### 開発サーバーを起動
```bash
pnpm start
```

### プラットフォーム別起動

#### iOS
```bash
pnpm ios
```

#### Android
```bash
pnpm android
```

#### Web
```bash
pnpm web
```

## ビルド
- eas cliのinstallが必要

### android

#### ローカルビルド
- jdk 17系が必要(検証時は17.0.14-liberica)
- .envにAPI_KEYを設定する
  - ローカルビルドの場合.envを直接参照できないためシェルに展開して対応する
```bash
export $(cat .env | xargs) && eas build -p android --profile preview --local
```

#### クラウド環境ビルド
- expo projectにAPI_KEYをsecretとして登録しておく
```bash
eas build -p android --profile preview
```