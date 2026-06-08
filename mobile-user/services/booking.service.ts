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

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'TX-834927',
    beachId: 1,
    beachName: 'Pantai Sari Ringgung',
    visitDate: '2026-06-12',
    quantity: 2,
    totalPrice: 50000,
    paymentMethod: 'Gopay',
    status: 'PAID',
    qrCode: 'BEACHGO-TX-834927-1-2',
    bookingDate: '2026-06-08T09:00:00Z',
  },
  {
    id: 'TX-129481',
    beachId: 3,
    beachName: 'Pantai Gigi Hiu',
    visitDate: '2026-05-20',
    quantity: 1,
    totalPrice: 20000,
    paymentMethod: 'Virtual Account Mandiri',
    status: 'COMPLETED',
    qrCode: 'BEACHGO-TX-129481-3-1',
    bookingDate: '2026-05-19T14:30:00Z',
  }
];

const cache: Record<string, string> = {};
const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return cache[key] || null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // ignore
    }
    cache[key] = value;
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
    delete cache[key];
  }
};

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
      const bookingsStr = await safeStorage.getItem('@BeachGo:bookings_list');
      const bookings: Booking[] = bookingsStr ? JSON.parse(bookingsStr) : [...MOCK_BOOKINGS];

      // Add new booking to start of list
      bookings.unshift(newBooking);

      // Save list back
      await safeStorage.setItem('@BeachGo:bookings_list', JSON.stringify(bookings));

      return newBooking;
    } catch (e) {
      console.warn('Failed to create booking:', e);
      throw new Error('Gagal memproses transaksi.');
    }
  },

  // Retrieve all bookings
  getBookings: async (): Promise<Booking[]> => {
    try {
      const bookingsStr = await safeStorage.getItem('@BeachGo:bookings_list');
      if (!bookingsStr) {
        // Seed initial mock bookings
        await safeStorage.setItem('@BeachGo:bookings_list', JSON.stringify(MOCK_BOOKINGS));
        return MOCK_BOOKINGS;
      }
      return JSON.parse(bookingsStr);
    } catch (e) {
      console.warn('Failed to get bookings:', e);
      return MOCK_BOOKINGS;
    }
  },

  // Retrieve single booking by ID
  getBookingById: async (id: string): Promise<Booking | null> => {
    try {
      const bookingsStr = await safeStorage.getItem('@BeachGo:bookings_list');
      const bookings: Booking[] = bookingsStr ? JSON.parse(bookingsStr) : MOCK_BOOKINGS;
      const found = bookings.find(b => b.id === id);
      return found || null;
    } catch (e) {
      console.warn('Failed to get booking by ID:', e);
      return MOCK_BOOKINGS.find(b => b.id === id) || null;
    }
  }
};

// Refactored helper function to simulate local database persistence latency
