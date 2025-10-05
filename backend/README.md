# イメージのビルド&プッシュ
- pushするにはArtifact Registry for Dockerへの認証が必要
https://cloud.google.com/artifact-registry/docs/docker/authentication?hl=ja#gcloud-helper

## ローカルでタグを付与してビルドする
下記の情報を含めたタグ付けを行う
- LOCATION: リポジトリのロケーション
- PROJECT-ID: Google CloudのプロジェクトID
- REPOSITORY: Artifact Registryのリポジトリ名
- IMAGE: イメージ名
```
{LOCATION}-docker.pkg.dev/{PROJECT_ID}/{REPOSITORY}/{IMAGE}
```

## ビルドしたイメージをリポジトリへプッシュする
```
docker push {LOCATION}-docker.pkg.dev/{PROJECT_ID}/{REPOSITORY}/{IMAGE}
```