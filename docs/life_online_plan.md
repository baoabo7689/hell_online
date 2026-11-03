# Kế hoạch: Cuộc Sống Online (life_online)

Bản nháp. Một web mô phỏng cuộc đời. Người chơi sống từ lúc sinh ra đến lúc chết, mọi lựa chọn tốt/xấu được ghi vào Sổ Sinh Tử.
Khi chết, linh hồn được chuyển sang **Địa Ngục Online** (hell_online) để Phán Quan xét xử dựa trên những gì thật sự đã làm.

## 1. Ý tưởng cốt lõi

- **Một kiếp người rút gọn**: 15–30 phút chơi = 0 → ~80 tuổi.
- Mỗi giai đoạn đời đưa ra các **tình huống** (event) với 2–4 lựa chọn. Lựa chọn tạo ra **công đức** (merit) hoặc **tội** (sin).
- Tội được map đúng vào **18 tầng địa ngục** mà hell_online đã định nghĩa. Ví dụ "cân điêu" → tầng 18 Cưa Xẻ, "đổ cơm thừa" → tầng 12 Cối Giã.
- Người chơi không thấy mình đang bị chấm điểm (hoặc chỉ thấy mơ hồ). Phán Quan mới là người "lật bài".
- Chết → nút **"Xuống âm phủ"** → chuyển hướng sang hell_online kèm hồ sơ linh hồn.

## 2. Vòng chơi

```
Sinh ra (random hoàn cảnh)
   │
   ▼
┌─ Giai đoạn đời ───────────────────────────────┐
│ Tuổi thơ → Học trò → Thanh niên → Trung niên → Tuổi già │
│   mỗi giai đoạn: 4–8 tình huống                │
│   lựa chọn → cập nhật chỉ số + Sổ Sinh Tử      │
└───────────────────────────────────────────────┘
   │  (có thể chết sớm: tai nạn, bệnh, liều mạng…)
   ▼
Chết → Tang lễ (người thân nói gì về bạn)
   ▼
Chuyển hồn sang hell_online?soul=…
```

### Chỉ số người chơi

| Chỉ số | Ý nghĩa | Ảnh hưởng |
|---|---|---|
| Tiền | giàu/nghèo | mở/khoá lựa chọn (hối lộ, từ thiện…) |
| Sức khoẻ | 0–100 | về 0 thì chết |
| Hạnh phúc | 0–100 | ảnh hưởng ending tang lễ |
| Quan hệ | gia đình, bạn bè, người yêu | các event gia đình |
| **Công đức** (ẩn) | tổng việc thiện | giảm số kiếp phạt ở hell_online |
| **Sổ tội** (ẩn) | danh sách `{levelId, sinIndex}` | Phán Quan đọc |

### Hoàn cảnh xuất thân (random)

Giàu/nghèo, thành thị/nông thôn, gia đình hoà thuận/đổ vỡ. Nếu người chơi đến từ hell_online (vừa đầu thai thành "người nghèo khó"), dùng đúng hoàn cảnh đó. Vòng luân hồi khép kín.

## 3. Thư viện tình huống (ví dụ)

| Giai đoạn | Tình huống | Lựa chọn → kết quả |
|---|---|---|
| Tuổi thơ | Thấy con mèo hoang bị ướt | Mang về nuôi (+công đức) / Lấy đá ném (tội: oxPit #0) |
| Học trò | Bạn cùng lớp bị bắt nạt | Bênh vực (+công đức, −sức khoẻ) / Hùa theo / Quay clip đăng mạng (tội: tongue #1) |
| Học trò | Ăn cơm căng-tin không ngon | Ăn hết / Đổ bỏ cả khay (tội: pestle #1) |
| Thanh niên | Người yêu của bạn thân tán tỉnh mình | Từ chối / Nhận lời (tội: scissors #0) |
| Thanh niên | Mở shop online | Bán hàng thật / Bán hàng nhái lãi gấp 3 (tội: saw #1) |
| Trung niên | Được đề nghị phong bì để duyệt hồ sơ | Từ chối / Nhận (tội: fireMountain #0, +tiền) |
| Trung niên | Bố mẹ già yếu | Đón về chăm / Gửi tiền / Bỏ mặc (tội: iceMountain #2) |
| Trung niên | Nhậu xong, tự lái xe về? | Gọi taxi / Tự lái (có xác suất gây tai nạn → tội: wrongfulDeath #0) |
| Tuổi già | Chia tài sản | Chia đều / Thiên vị, xúi con tranh giành (tội: ironTree #1) |
| Bất kỳ | Có người kêu oan cho mình nhưng mình là thủ phạm | Nhận tội / Đổ tội người khác (tội: mirror #1) |

Mục tiêu MVP: ~60 tình huống, phủ đủ 18 tầng (mỗi tầng ≥ 2 tình huống dẫn tới), cộng ~20 tình huống thuần công đức.

Nguyên tắc nội dung:
- Lựa chọn xấu phải có **lợi ích ngắn hạn thật** (tiền, vui, tiện). Có cám dỗ thì lựa chọn mới có ý nghĩa.
- Không có tình huống tự tử, phá thai, hay chủ đề nhạy cảm tương tự. Hell_online cũng đã tránh những chủ đề này.
- Giọng văn hài hước nhẹ, giống hell_online.

## 4. Hợp đồng chuyển hồn (đã có sẵn phía hell_online)

hell_online đọc tham số `?soul=<base64url(JSON)>`:

```json
{
  "version": 1,
  "soulName": "Nguyễn Văn Tèo",
  "sins": [
    { "levelId": "saw", "sinIndex": 1 },
    { "levelId": "pestle", "sinIndex": 1 }
  ],
  "merit": 35
}
```

- `levelId` là một trong 18 id trong [src/data/hellLevels.ts](../src/data/hellLevels.ts). `sinIndex` là vị trí tội trong `levels.<id>.sins` của file i18n.
- `sins` rỗng → Phán Quan thấy sổ trắng → lên thiên đường.
- `merit`: cứ 10 điểm công đức bớt 1 kiếp phạt (tối thiểu vẫn 1 kiếp).
- Tội không hợp lệ bị bỏ qua. Tối đa 12 tội.
- Hàm encode/parse dùng chung: [src/utilities/soulTransfer.ts](../src/utilities/soulTransfer.ts) (`encodeSoulTransfer`). Nên tách thành package/file dùng chung khi làm life_online.

Ví dụ redirect khi chết:

```ts
window.location.href = `https://<host>/hell_online/?soul=${encodeSoulTransfer(payload)}`;
```

### Chiều ngược lại (giai đoạn 3)

Khi đầu thai ở hell_online, nút "Sống kiếp mới" → `life_online/?rebirth=<base64url({ form, previousSoulName })>`.
Nếu đầu thai thành người thì bắt đầu đời mới với hoàn cảnh tương ứng. Nếu thành con vật thì chơi một "kiếp thú" ngắn (ví dụ kiếp chó: 5 tình huống), chết, rồi xuống lại hell_online. Kiếp thú hầu như không thể gây tội, nên sau đó dễ được làm người.

## 5. Kiến trúc kỹ thuật

Giữ đúng khuôn của sudoku / shikaku / hell_online:

- Next.js 13 (app router) + React 18 + TypeScript + Tailwind, `output: 'export'` → GitHub Pages (`/life_online`).
- i18n vi/en bằng `LanguageContext` + `src/i18n/{vi,en}.ts`. Nội dung tình huống nằm trong i18n, còn logic (id, hiệu ứng lên chỉ số, tội gắn kèm) nằm trong `src/data/events.ts`.
- Không cần backend ở MVP. Lưu tiến trình trong `localStorage`, dữ liệu chuyển qua URL.

```
src/
  app/page.tsx              máy trạng thái: birth → life stages → death → transfer
  models/Life.ts            Life, Stats, LifeEvent, Choice, SinRecord (dùng chung kiểu với hell_online)
  data/events.ts            ~60 tình huống: { id, stage, minAge, requires, choices[{ effects, sin?, merit? }] }
  data/backgrounds.ts       hoàn cảnh xuất thân
  utilities/lifeEngine.ts   chọn event tiếp theo (theo tuổi, điều kiện, random có trọng số), áp hiệu ứng, xác suất chết
  utilities/soulTransfer.ts copy/dùng chung với hell_online
  components/stages/        BirthStage, LifeEventStage, DeathStage, FuneralStage
```

### Mô hình dữ liệu event

```ts
interface LifeEvent {
  id: string;
  stage: 'childhood' | 'school' | 'youth' | 'midlife' | 'elder';
  weight: number;
  requires?: { minMoney?: number; hasPartner?: boolean; hasChildren?: boolean };
  choices: Array<{
    id: string;
    effects: Partial<Record<'money' | 'health' | 'happiness', number>>;
    sin?: { levelId: string; sinIndex: number };
    merit?: number;
    deathChance?: number;
  }>;
}
```

## 6. Lộ trình

| Giai đoạn | Nội dung | Ước lượng |
|---|---|---|
| 0 | Scaffold từ hell_online (header, i18n, deploy), tách `soulTransfer` dùng chung | 0.5 ngày |
| 1 – MVP | Engine + 5 giai đoạn đời + ~30 tình huống phủ 18 tầng + chết + chuyển hồn | 3–4 ngày |
| 2 | Lên ~60 tình huống, tang lễ (lời người thân theo chỉ số), chết sớm do lựa chọn liều | 2–3 ngày |
| 3 | Vòng luân hồi khép kín: nhận `?rebirth=` từ hell_online, kiếp thú ngắn | 2 ngày |
| 4 | Ảnh AI cho từng giai đoạn đời, âm thanh, chia sẻ "bia mộ" lên mạng xã hội | tuỳ chọn |
| 5 (xa) | Backend nhỏ (Supabase/Firebase): lưu nhiều kiếp, bảng xếp hạng "người thiện nhất", nhiều người chơi cùng một "thế giới" | tuỳ chọn |

## 7. Rủi ro & lưu ý

- **URL dài**: 12 tội × ~30 ký tự vẫn < 1 KB, an toàn. Nếu sau này mang thêm lịch sử chi tiết, chuyển sang backend hoặc `sessionStorage` khi hai web cùng domain.
- **Gian lận**: người chơi tự sửa `?soul=` để lên thiên đường. Với game giải trí thì chấp nhận được. Nếu cần, ký HMAC ở backend (giai đoạn 5).
- **Đồng bộ danh sách tội**: life_online tham chiếu `sinIndex` theo thứ tự trong i18n của hell_online. Đổi thứ tự sẽ làm sai tội. Nên chuyển sang id dạng chuỗi (`saw.counterfeit`) trước khi hai web cùng chạy, và tăng `version` của payload.
- **Tone**: giữ hài hước, không giảng đạo. Cám dỗ phải hấp dẫn thật thì người chơi mới thấy "phán xét" có ý nghĩa.
