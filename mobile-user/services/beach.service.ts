export interface Beach {
  id: number;
  name: string;
  description: string;
  location: string;
  ticketPrice: number;
  imageUrl: string;
  rating: number;
  category: string;
  facilities: string[];
}

// Gorgeous Lampung Beaches mock data
const MOCK_BEACHES: Beach[] = [
  {
    id: 1,
    name: 'Pantai Sari Ringgung',
    description: 'Pantai Sari Ringgung adalah salah satu destinasi pantai terpopuler di Lampung. Terkenal dengan pasir putihnya yang bersih, air laut yang tenang, serta daya tarik unik berupa Masjid Terapung Al-Aminah dan pasir timbul di tengah laut yang eksotis.',
    location: 'Pesawaran, Lampung',
    ticketPrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    category: 'Populer',
    facilities: ['Area Parkir', 'Masjid Terapung', 'Sewa Perahu', 'Kamar Mandi', 'Gazebo', 'Warung Makan'],
  },
  {
    id: 2,
    name: 'Pantai Klara Indah',
    description: 'Pantai Klara (Kelapa Rapat) terkenal dengan airnya yang sangat dangkal dan tenang, menjadikannya pantai yang sangat ramah anak. Barisan pohon kelapa yang rindang memberikan suasana sejuk dan damai bagi pengunjung.',
    location: 'Pesawaran, Lampung',
    ticketPrice: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    category: 'Keluarga',
    facilities: ['Kamar Mandi', 'Warung Makan', 'Sewa Ban Berenang', 'Gazebo Rindang', 'Penyewaan Kano'],
  },
  {
    id: 3,
    name: 'Pantai Gigi Hiu',
    description: 'Terkenal dengan formasi batu karang tajam menjulang yang mirip dengan barisan gigi hiu. Pantai ini sangat disukai oleh para fotografer profesional dan pecinta petualangan karena pemandangan sunsetnya yang luar biasa indah di sela-sela karang.',
    location: 'Tanggamus, Lampung',
    ticketPrice: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    category: 'Petualangan',
    facilities: ['Spot Foto Karang', 'Pemandu Lokal', 'Warung Kecil', 'Area Parkir Terbatas'],
  },
  {
    id: 4,
    name: 'Pantai Minang Rua',
    description: 'Pantai eksotis dengan tebing batu karang yang menakjubkan, gua bawah karang yang misterius, dan area penangkaran penyu hijau. Pantai ini menawarkan paket wisata alam yang sangat lengkap dan alami.',
    location: 'Bakauheni, Lampung Selatan',
    ticketPrice: 10000,
    imageUrl: 'https://images.unsplash.com/photo-1473116763269-25541579ffbe?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    category: 'Eksotis',
    facilities: ['Penangkaran Penyu', 'Gua Karang', 'Canoeing', 'Camping Ground', 'Home Stay'],
  },
  {
    id: 5,
    name: 'Pantai Mutun & Pulau Pasir',
    description: 'Pantai yang lokasinya sangat dekat dengan Kota Bandar Lampung. Memiliki fasilitas water sport yang lengkap seperti Banana Boat, Jet Ski, dan perahu penyeberangan menuju Pulau Pasir timbul dan Pulau Tangkil.',
    location: 'Pesawaran, Lampung',
    ticketPrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    rating: 4.4,
    category: 'Water Sport',
    facilities: ['Water Sport', 'Pulau Tangkil', 'Mushola', 'Kamar Bilas', 'Panggung Hiburan'],
  },
  {
    id: 6,
    name: 'Pantai Sebalang',
    description: 'Tempat nongkrong anak muda Lampung paling hits untuk menikmati senja. Dilengkapi dengan bean bag warna-warni di hamparan pasir pantai, iringan live music akustik, dan kedai-kedai kopi estetik.',
    location: 'Tarahan, Lampung Selatan',
    ticketPrice: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    category: 'Populer',
    facilities: ['Cafe & Bar', 'Bean Bags', 'Live Music', 'Spot Foto Lampu Senja', 'Mushola'],
  }
];

export const beachService = {
  // Fetch list of beaches
  getBeaches: async (searchQuery?: string, category?: string): Promise<Beach[]> => {
    try {
      let beaches = [...MOCK_BEACHES];

      // Filter by search query
      if (searchQuery) {
        beaches = beaches.filter(
          b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               b.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by category
      if (category && category !== 'Semua') {
        beaches = beaches.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }

      return beaches;
    } catch (error) {
      console.error('getBeaches error:', error);
      return MOCK_BEACHES;
    }
  },

  // Fetch beach details by ID
  getBeachById: async (id: number): Promise<Beach | null> => {
    try {
      const found = MOCK_BEACHES.find(b => b.id === id);
      return found || null;
    } catch (error) {
      console.error('getBeachById error:', error);
      const found = MOCK_BEACHES.find(b => b.id === id);
      return found || null;
    }
  }
};

// Refactored helper function to simulate mock API delay and errors
