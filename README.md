# Web Trắc Nghiệm Ôn Tập — Phương Pháp Nghiên Cứu Khoa Học (107 Câu)

Trang web tĩnh (HTML / CSS / JS thuần) chứa trọn vẹn **107 câu hỏi nguyên văn 100%** từ tài liệu `Phương pháp nghiên cứu khoa học.docx`, kèm **107 ảnh chụp trích đoạn gốc** (`assets/originals/q001.png` – `q107.png`) để đối chiếu đáp án bất cứ lúc nào.

## Tính năng chính
- **Ôn luyện (Practice):** Lọc theo 5 chuyên đề, câu chưa làm, câu làm sai, hoặc câu đã gắn cờ. Có chế độ chấm ngay, trộn câu/đáp án, phím tắt (`1–4` chọn đáp án, `← / →` chuyển câu, `F` gắn cờ) và nút **Xem ảnh gốc đối chiếu** ở từng câu.
- **Thi thử (Exam):** Đề nhanh 30 câu (20 phút), đề tiêu chuẩn 50 câu (35 phút) hoặc toàn bộ 107 câu (70 phút). Ảnh gốc được ẩn trong lúc làm bài và mở xem đối chiếu ngay sau khi nộp bài.
- **Ngân hàng 107 câu (Tra cứu):** Tìm nhanh theo từ khóa hoặc số câu, ẩn/hiện đáp án dạng flashcard và đối chiếu ảnh gốc.
- **Lưu tiến độ tự động** qua `localStorage` + chế độ Sáng / Tối bảo vệ mắt.

## Cách đưa lên GitHub & bật GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ `ppnctcn-quiz`).
2. Upload **toàn bộ nội dung bên trong thư mục `github-pages-quiz/`** lên nhánh `main` của repository (đảm bảo `index.html` và `.nojekyll` nằm ngay thư mục gốc của repo):
   ```bash
   cd d:\ppnctcn\github-pages-quiz
   git init
   git add .
   git commit -m "Deploy 107-question PPNCTCN quiz to GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<ten-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```
3. Trên GitHub, vào **Settings → Pages**:
   - Mục **Source**: chọn **Deploy from a branch**.
   - Mục **Branch**: chọn **`main`** và thư mục **`/ (root)`** → bấm **Save**.
4. Chờ khoảng 30–60 giây, GitHub sẽ cấp đường link dạng `https://<ten-cua-ban>.github.io/<ten-repo>/` để bạn và mọi người cùng vào ôn tập.
