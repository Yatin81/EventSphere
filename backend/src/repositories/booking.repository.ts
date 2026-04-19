export class BookingRepository {
  async findAvailableSeats(tx: any, seatIds: number[]) {
    return tx.seat.findMany({
      where: {
        id: { in: seatIds },
        status: "AVAILABLE"
      }
    });
  }

  async createBooking(tx: any, data: any) {
    return tx.booking.create({ data });
  }

  async markSeatsBooked(tx: any, seatIds: number[]) {
    return tx.seat.updateMany({
      where: { id: { in: seatIds } },
      data: { status: "BOOKED" }
    });
  }

  async linkSeats(tx: any, bookingId: number, seatIds: number[]) {
    return tx.booking_Seat.createMany({
      data: seatIds.map((seatId) => ({
        bookingId,
        seatId
      }))
    });
  }
}