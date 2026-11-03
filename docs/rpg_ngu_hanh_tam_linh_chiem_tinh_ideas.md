# Ý tưởng game RPG online: Ngũ hành – Tâm linh – Chiêm tinh

Cả ba chất liệu ngũ hành, tâm linh, chiêm tinh khớp với RPG ở một điểm chung: **ngày giờ sinh của người chơi quyết định nhân vật**.
Nhập ngày sinh, game tự tính mệnh (Kim/Mộc/Thủy/Hỏa/Thổ), can chi và cung hoàng đạo, rồi sinh ra một nhân vật riêng.
Riêng phần này đã đủ hấp dẫn để người ta tò mò thử và chia sẻ.

## 1. Ngũ Hành Kỳ Lộ – RPG đánh theo lượt (đề xuất số 1)

**Cốt truyện:** Ngũ Hành Châu (năm viên ngọc giữ cân bằng trời đất) bị vỡ, năm vùng đất mất cân bằng: rừng Mộc khô héo, núi Hỏa tắt lửa, sông Thủy nhiễm độc…
Bạn là "Người Giữ Mệnh" đi thu thập lại các mảnh ngọc.

### Tạo nhân vật từ ngày sinh

- **Mệnh** (nạp âm theo năm sinh, ví dụ "Sơn Hạ Hỏa") là hệ chính, quyết định kỹ năng gốc.
- **Con giáp** cho một kỹ năng bị động (Tý nhanh nhẹn né đòn, Sửu bền bỉ thêm máu…).
- **Cung hoàng đạo** là "định mệnh phụ": Bạch Dương mạnh ở lượt đầu, Song Ngư hồi phục khi máu thấp…
- Kết quả là thẻ nhân vật đẹp để chia sẻ ("Tôi là Hỏa – Dần – Sư Tử").

### Chiến đấu: tương sinh tương khắc làm lõi

- Đòn **khắc** hệ đối thủ gây x2 sát thương (Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy).
- Dùng kỹ năng theo chuỗi **tương sinh** thì tạo combo (Mộc → Hỏa → Thổ → Kim → Thủy), đòn sau mạnh dần. Người chơi phải tính thứ tự ra chiêu, không chỉ bấm đòn mạnh nhất.
- Đội hình 3 đồng hành, mỗi người một hệ. Đội thiếu hệ nào sẽ dễ bị khắc.

### Tâm linh – chiêm tinh trong gameplay

- **Giờ hoàng đạo thật**: đánh boss đúng giờ hoàng đạo trong ngày (theo giờ thực tế của máy) được bonus, giờ hắc đạo quái mạnh hơn.
- **Ngày âm lịch thật**: mùng 1 và rằm mở đền đặc biệt, tháng 7 âm lịch có sự kiện Cô Hồn.
- **Gieo quẻ trước trận**: rút một quẻ Dịch, nhận buff hoặc debuff ngẫu nhiên. Đây là chỗ đặt yếu tố "may rủi tâm linh".

### Vì sao đề xuất

Hệ thống đơn giản để hiểu (5 hệ, quan hệ vòng tròn) nhưng có chiều sâu chiến thuật.
Chạy được hoàn toàn phía client, lưu bằng localStorage, đúng khuôn web tĩnh Next.js của sudoku/shikaku/hell_online.

## 2. Thầy Pháp Tập Sự – RPG khám phá, trừ tà

- Bạn là học trò của một thầy pháp trong làng. Mỗi "vụ" là một gia đình gặp chuyện lạ: nhà bị nhập, giếng có tiếng khóc, cây cổ thụ đòi lễ.
- Lối chơi: điều tra manh mối, xác định vong thuộc hệ gì (vong chết đuối thuộc Thủy, chết cháy thuộc Hỏa…), rồi chọn bùa, lễ vật, giờ làm lễ khắc hệ đó. Chọn sai thì vong mạnh lên.
- Tiến trình: học thêm bùa chú, nâng cấp la bàn phong thủy, mở khoá làng mới.
- Điểm hút: giống phim kinh dị dân gian, mỗi vụ là một truyện ngắn.

## 3. Thập Nhị Cung – RPG chiêm tinh theo mùa

- Thế giới có 12 vương quốc, mỗi cung hoàng đạo một vương quốc. Bản đồ xoay vòng theo **ngày thật trong năm**: đang mùa Bọ Cạp thì vương quốc Bọ Cạp mở cửa, quái hệ Bọ Cạp mạnh hơn.
- Người chơi quay lại mỗi tháng để chinh phục cung mới, gần như game theo mùa giải.
- Kết hợp với ngũ hành phương Đông: mỗi cung gắn một hành, nên 2 hệ thống hòa làm một.
- Điểm hút: lý do quay lại hằng tháng. Nhược điểm: phải chờ cả năm mới đi hết.

## 4. Luân Hồi Ký – Roguelike nhiều kiếp (nối với hell_online)

- Mỗi lần chơi là một kiếp. Ngày giờ sinh ngẫu nhiên, mệnh, con giáp và cung đều thay đổi, nên mỗi kiếp là một bộ kỹ năng khác.
- Chết thì xuống âm phủ (dùng lại hell_online để phán xét qua `?soul=…`), công đức kiếp này quy ra "phước" mở khóa lợi thế cho kiếp sau.
- Vòng lặp roguelike chuẩn: thua là chơi lại, nhưng mạnh dần qua các kiếp.
- Điểm hút: khép kín vũ trụ hell_online + life_online thành một game (xem [life_online_plan.md](life_online_plan.md)).

## Hướng "online" thực sự (nhiều người chơi)

Nếu muốn có yếu tố online thật thay vì chơi một mình:

- **Hợp mệnh – Kết nghĩa**: gửi link mời bạn bè, game tính hai mệnh tương sinh hay tương khắc. Tương sinh thì được kết nghĩa, có kỹ năng đôi.
- **Bảng xếp hạng theo mệnh**: "Hệ Hỏa đang dẫn đầu tuần này". Người chơi tự chia phe theo năm sinh.
- Cần backend nhỏ (Supabase/Firebase). Nên làm sau khi bản chơi đơn đã ổn.

## Lộ trình đề xuất

Bắt đầu với **Ngũ Hành Kỳ Lộ (số 1)**, phạm vi MVP:

1. Màn tạo nhân vật từ ngày sinh (mệnh nạp âm, con giáp, cung hoàng đạo) và thẻ chia sẻ. Riêng màn này đã có thể phát hành để thu hút người chơi.
2. Hệ thống chiến đấu theo lượt với tương sinh tương khắc và combo.
3. Một vùng đất (ví dụ rừng Mộc) với 5–6 trận và một boss, có giờ hoàng đạo thật.
4. Sau đó mới thêm 4 vùng còn lại, gieo quẻ, sự kiện âm lịch.

Phần ngày giờ thật (giờ hoàng đạo, âm lịch) dùng chung được với ý tưởng web Lịch Âm – Ngày Tốt, làm một lần dùng cho cả hai.
