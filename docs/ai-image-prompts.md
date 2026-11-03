# Prompt tạo ảnh AI cho 18 tầng địa ngục

Web hiện dựng cảnh bằng emoji + hiệu ứng CSS, nên chạy được ngay mà không cần ảnh.
Khi có ảnh AI, mỗi vòng hình phạt sẽ dùng một ảnh khác làm nền (chọn theo `sceneSeed`).

## Cách thêm ảnh

1. Tạo ảnh bằng Midjourney / DALL·E / Stable Diffusion / Imagen với prompt bên dưới.
2. Lưu theo đường dẫn `public/images/levels/<levelId>/<số>.webp`, ví dụ `public/images/levels/oilCauldron/1.webp`, `2.webp`, `3.webp`.
3. Khai báo số ảnh trong [src/data/aiImages.ts](../src/data/aiImages.ts):

```ts
export const aiImageCountByLevel: Record<string, number> = {
  oilCauldron: 3,
  tongue: 2,
};
```

Nên tạo 3–5 ảnh mỗi tầng (khác góc nhìn, ánh sáng) để mỗi vòng lặp có hình mới. Tỷ lệ 16:9, ≥ 1600px, xuất `.webp`.

## Style chung (ghép vào đầu mỗi prompt)

> Vietnamese folk-religion underworld, painted in the style of a traditional temple mural mixed with dark fantasy concept art, warm ember lighting, smoke, dramatic composition, no gore, no visible blood splatter, symbolic rather than graphic, wide 16:9 scene, no text

## Prompt theo tầng

| levelId | Tầng | Prompt |
|---|---|---|
| tongue | 1 – Rút Lưỡi | demon with iron tongs pulling a sinner's very long tongue like a ribbon across a dim cavern, echoing speech bubbles of lies floating as ghostly smoke |
| scissors | 2 – Cắt Kéo | giant iron scissors hovering over a kneeling sinner, broken wedding rings and torn red threads drifting in the air |
| ironTree | 3 – Cây Sắt | a towering tree made of black iron with blade-shaped leaves, sinners clinging to its branches under a cold wind |
| mirror | 4 – Nghiệt Kính | a hall of a thousand bronze karma mirrors, each showing a different misdeed of the same trembling soul |
| steamer | 5 – Lồng Hấp | enormous bamboo steamer baskets stacked high, steam pouring out, faces of gossiping sinners peeking through |
| copperPillar | 6 – Cột Đồng | a glowing red-hot copper pillar with fire inside, a chained sinner bound to it, demons fanning the flames |
| knifeMountain | 7 – Núi Đao | a mountain whose slope is made of upright sword blades, barefoot sinners climbing, animal spirits watching from below |
| iceMountain | 8 – Núi Băng | a frozen mountain in a blizzard, sinners half-buried in blue ice, breath turning to frost |
| oilCauldron | 9 – Vạc Dầu | a colossal bronze cauldron of bubbling oil over a roaring fire, ox-headed demons stirring with long forks |
| oxPit | 10 – Trâu Húc | a dusty pit filled with snorting water buffalo charging at a cowering sinner |
| stoneCrush | 11 – Đá Đè | huge boulders stacked on a sinner lying on cracked ground, faint silhouettes of crying children in the mist above |
| pestle | 12 – Cối Giã | a giant stone mortar with a massive pestle, spilled rice grains glowing like embers around it |
| bloodPool | 13 – Ao Máu | a dark crimson lake under a blood-red moon, sinners wading up to their chests, withered flowers on the shore |
| wrongfulDeath | 14 – Uổng Tử | a foggy crossroads frozen in time, a wrecked motorbike and broken wine bottle, a sinner forced to watch a replay in a mirror of mist |
| dismember | 15 – Phanh Thây | four shadowy underworld horses straining chains in four directions around a sinner, an opened tomb and broken incense urns nearby |
| fireMountain | 16 – Núi Lửa | an erupting volcano, a sinner carrying sacks of gold coins up to the crater, banknotes burning into ash in the air |
| millstone | 17 – Cối Xay | a gigantic grinding millstone turning slowly, a fake monk's robe and prayer beads caught between the stones |
| saw | 18 – Cưa Xẻ | two demons operating a huge two-man saw over a sinner lying between planks, a rigged merchant's scale beside them |

## Nhân vật (tuỳ chọn, cho các màn khác)

| Nhân vật | Prompt |
|---|---|
| Ngưu Đầu – Mã Diện | ox-headed and horse-faced underworld guards in Chinese-Vietnamese armor holding iron chains and tridents, escorting a pale ghost |
| Phán Quan | stern underworld judge in a black official's hat and red robe, holding a brush and the open Book of Life and Death |
| Diêm Vương | King Yama on a towering throne, crimson robe, fierce bearded face, gavel, smoke and lanterns around the palace |
| Mạnh Bà | kind old woman in a mist-covered pavilion at the end of a stone bridge, offering a bowl of steaming soup |
| Cầu thang thiên đường | a white marble stairway rising through golden clouds, an armored angel with a radiant sword guarding the top, ghosts dissolving into light |
