import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Booking {
  id: string;
  beachId: number;
  beachName: string;
  visitDate: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED';
  qrCode: string;
  bookingDate: string;
}

export const bookingService = {
  // Create a new booking
  createBooking: async (
    beachId: number,
    beachName: string,
    visitDate: string,
    quantity: number,
    totalPrice: number,
    paymentMethod: string
  ): Promise<Booking> => {
    try {
      const id = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      const qrCode = `BEACHGO-${id}-${beachId}-${quantity}`;
      const bookingDate = new Date().toISOString();

      const newBooking: Booking = {
        id,
        beachId,
        beachName,
        visitDate,
        quantity,
        totalPrice,
        paymentMethod,
        status: 'PAID', // Auto-paid for mock demonstration smoothness
        qrCode,
        bookingDate,
      };

      // Get existing bookings
      const bookingsStr = await AsyncStorage.getItem('@BeachGo:bookings_list');
      const bookings: Booking[] = bookingsStr ? JSON.parse(bookingsStr) : [];

      // Add new booking to start of list
      bookings.unshift(newBooking);

      // Save list back
      await AsyncStorage.setItem('@BeachGo:bookings_list', JSON.stringify(bookings));

      return newBooking;
    } catch (e) {
      console.error('Failed to create booking:', e);
      throw new Error('Gagal memproses transaksi.');
    }
  },

  // Retrieve all bookings
  getBookings: async (): Promise<Booking[]> => {
    try {
      const bookingsStr = await AsyncStorage.getItem('@BeachGo:bookings_list');
      return bookingsStr ? JSON.parse(bookingsStr) : [];
    } catch (e) {
      console.error('Failed to get bookings:', e);
      return [];
    }
  },

  // Retrieve single booking by ID
  getBookingById: async (id: string): Promise<Booking | null> => {
    try {
      const bookingsStr = await AsyncStorage.getItem('@BeachGo:bookings_list');
      if (!bookingsStr) return null;

      const bookings: Booking[] = JSON.parse(bookingsStr);
      const found = bookings.find(b => b.id === id);
      return found || null;
    } catch (e) {
      console.error('Failed to get booking by ID:', e);
      return null;
    }
  }
};

// Refactored helper function to simulate local database persistence latency
