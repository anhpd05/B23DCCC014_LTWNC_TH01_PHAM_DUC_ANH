export const DAY_MS = 86_400_000;

/**
 * Chuẩn hoá một mốc thời gian về 00:00 giờ địa phương.
 *
 * Toàn bộ nghiệp vụ hạn nộp so sánh theo NGÀY, không theo giây: một bài tập
 * đến hạn 23:59 hôm nay vẫn là "Hạn hôm nay", không phải "Quá hạn". Bộ lọc và
 * bộ đếm ngược bắt buộc dùng chung hàm này, nếu không số đếm trên thanh lọc sẽ
 * lệch với chữ hiển thị trên từng hàng.
 */
export function startOfDay(t: number): number {
  return new Date(t).setHours(0, 0, 0, 0);
}
