# Hell Online / Địa Ngục Online

An online journey through the Eighteen Levels of Hell, inspired by "online temple" and "online church" sites.

Ngưu Đầu – Mã Diện bắt hồn → Phán Quan đọc Sổ Sinh Tử → điện Diêm Vương định án → áp giải xuống tầng địa ngục → nhập vai chịu phạt (nhẹ → vừa → nặng, lặp lại với cảnh mới đến khi nghiệp tiêu) → cầu Nại Hà, canh Mạnh Bà → bánh xe luân hồi.
Hồn trong sạch: bậc thang thiên đường, thiên thần giữ cổng tiêu diệt hồn ma lén theo, hoá thành thiên thần.

## Run

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # static export to out/
```

Deploys to GitHub Pages (`/hell_online`) via `.github/workflows/deploy.yml`, same as sudoku/shikaku.

## Structure

- `src/app/page.tsx`: journey state machine (persisted in localStorage, resumable)
- `src/components/stages/`: one component per stage
- `src/data/hellLevels.ts`: the 18 levels (icon, colors, particles, number of sins)
- `src/i18n/{vi,en}.ts`: all texts (sins, punishments, dialogue, rebirth forms)
- `src/utilities/soulTransfer.ts`: `?soul=` contract for the future Life Online site

## Docs

- [docs/ai-image-prompts.md](docs/ai-image-prompts.md): prompts and how to plug AI images into each level
- [docs/life_online_plan.md](docs/life_online_plan.md): plan for the Life Online simulation that sends souls here
