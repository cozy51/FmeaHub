# FMEA Hub

機種・部門・会社ごとに異なる FMEA を、共通データと交換可能な表示フォーマットに分離して管理する社内向け Web アプリです。Phase 1・2 の MVP として、業務ダッシュボード、インライン編集、詳細パネル、検索、複製、RPN 自動計算、フォーマット切替、Excel 出力を実装しています。

## 技術構成と起動方法

- React / TypeScript / Vite
- CSS（レスポンシブな業務 UI）
- SheetJS（表示フォーマットに沿った Excel 出力）

```bash
npm install
npm run dev
```

品質チェックは `npm run lint` と `npm run build` で実行できます。

## データ構造

`Item` は工程、品目、故障モード、原因、影響、現行管理、検出方法、評価値、対策、日程、対策後評価を標準フィールドとして保持します。追加項目は `customFields` に格納します。RPN は保存値ではなく、現在・対策後の SEV × OCC × DET から常に算出します。

本 MVP は画面確認を容易にするためブラウザ内のサンプルデータを利用します。本番化では UI から Repository / Service / API 層を経由し、Prisma の `Company`、`Department`、`Machine`、`FmeaDocument`、`FmeaItem`、`FormatDefinition`、`FormatColumn`、`RevisionHistory` へ保存する構成を想定しています。これにより SQLite から PostgreSQL / SQL Server へ移行できます。

## FMEA 共通モデルと Format 定義

`src/types.ts` の共通モデルには形式 A・B 双方の意味情報が入り、`src/data.ts` の `formats` は表示名、内部フィールド、順序、幅、編集可否、評価項目かを定義します。テーブルは定義を走査して生成するため、特定機種を判定するハードコードはありません。初期登録の FORMAT A（設計・リスク系）と FORMAT B（工程系）を切り替えても、同一データを異なる列名と順序で表示します。

## Excel インポート / エクスポート

エクスポートは選択中 Format の列名、順番、幅を反映します。次フェーズのインポートでは、ワークブックのヘッダーを読み取り、`Excel 列 → 共通 Item フィールド` の対応を Column Mapping Editor で確認し、マッピングを Format Definition に保存します。データ検証とプレビューを経て Repository に一括登録する設計です。

## 今後の拡張

1. Prisma と永続 DB、Repository / Service/API の実装
2. Excel マッピング UI、バリデーション、インポート履歴
3. Revision の複製・ロックと項目単位の監査ログ
4. 機種横断の全文・類似検索（将来はベクトル検索）
5. VIEWER / EDITOR / ADMIN 権限、SSO、承認ワークフロー
6. 対策から組立確認項目への `linkedCheckItemIds` 連携
