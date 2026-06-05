import { Booking } from "@/components/dashboard/data-context";

export function calculateRevenueSummary(bookings: Booking[]) {
  const successBookings = bookings.filter((b) => b.status === "Success");
  const totalRevenue = successBookings.reduce((sum, b) => sum + b.amount, 0);
  
  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const pendingAmount = pendingBookings.reduce((sum, b) => sum + b.amount, 0);

  return {
    totalRevenue,
    pendingAmount,
    successCount: successBookings.length,
    pendingCount: pendingBookings.length,
    cancelledCount: bookings.filter((b) => b.status === "Cancelled").length,
  };
}

export function groupBookingsByBeach(bookings: Booking[]) {
  const result: Record<string, { tickets: number; revenue: number }> = {};
  
  bookings
    .filter((b) => b.status === "Success")
    .forEach((b) => {
      if (!result[b.beachName]) {
        result[b.beachName] = { tickets: 0, revenue: 0 };
      }
      result[b.beachName].tickets += b.quantity;
      result[b.beachName].revenue += b.amount;
    });

  return result;
}
