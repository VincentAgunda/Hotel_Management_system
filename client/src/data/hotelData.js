import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export const mockRooms = [
  {
    id: '101',
    type: 'Deluxe',
    description: 'Spacious room with king-size bed and city view.',
    price: 25870,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe'],
    image: '/deluxe-room.jpg',
    size: '450 sq ft',
    beds: '1 King Bed',
    maxGuests: 2,
    details: 'Our Deluxe Rooms offer a perfect blend of comfort and style. Featuring floor-to-ceiling windows with stunning city views, a plush king-size bed with premium linens, and a spacious marble bathroom with a rainfall shower.',
    images: ['/deluxe-room.jpg', '/deluxe-room.jpg', '/deluxe-room.jpg', '/deluxe-room.jpg'],
    rating: 4.7,
    reviews: 128,
  },
  {
    id: '102',
    type: 'Suite',
    description: 'Luxurious suite with a separate living area and jacuzzi.',
    price: 38870,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony'],
    image: '/suite-room.jpg',
    size: '800 sq ft',
    beds: '1 King Bed',
    maxGuests: 3,
    details: 'Experience ultimate luxury in our spacious suites featuring a separate living area, dining space, and a private balcony. The bedroom features a king-size bed, and the luxurious bathroom includes a deep soaking tub.',
    images: ['/suite-room-1.jpg', '/suite-room-2.jpg', '/suite-room-3.jpg', '/suite-bathroom.jpg'],
    rating: 4.9,
    reviews: 94,
  },
  {
    id: '103',
    type: 'Single',
    description: 'Cozy for solo travelers',
    price: 12900,
    amenities: ['WiFi', 'TV', 'AC'],
    image: '/single-room.jpg',
    size: '300 sq ft',
    beds: '1 Twin Bed',
    maxGuests: 1,
    details: 'Compact yet comfortable room perfect for solo travelers. Features a comfortable twin bed, workspace area, and modern amenities.',
    images: ['/single-room-1.jpg', '/single-room-2.jpg'],
    rating: 4.3,
    reviews: 87,
  },
  {
    id: '104',
    type: 'Double',
    description: 'Two queen beds',
    price: 19370,
    amenities: ['WiFi', 'TV', 'AC', 'Safe'],
    image: '/double-room.jpg',
    size: '400 sq ft',
    beds: '2 Queen Beds',
    maxGuests: 4,
    details: 'Ideal for families or small groups, featuring two comfortable queen beds and ample storage space.',
    images: ['/double-room-1.jpg', '/double-room-2.jpg'],
    rating: 4.5,
    reviews: 112,
  },
  {
    id: '105',
    type: 'Presidential',
    description: 'Panoramic views, premium',
    price: 77870,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony', 'Butler Service'],
    image: '/presidential-room.jpg',
    size: '1200 sq ft',
    beds: '1 King Bed',
    maxGuests: 4,
    details: 'Our most luxurious offering with panoramic city views, separate living and dining areas, premium furnishings, and personalized butler service.',
    images: ['/presidential-1.jpg', '/presidential-2.jpg', '/presidential-3.jpg', '/presidential-bath.jpg'],
    rating: 4.95,
    reviews: 56,
  },
  {
    id: '201',
    type: 'Ocean View',
    description: 'Stunning ocean views from private balcony',
    price: 32450,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Balcony', 'Coffee Maker'],
    image: '/ocean-view-room.jpg',
    size: '500 sq ft',
    beds: '1 King Bed',
    maxGuests: 2,
    details: 'Wake up to breathtaking ocean views in this beautifully appointed room. Features a private balcony, premium bedding, and a spacious bathroom with walk-in shower. Perfect for romantic getaways.',
    images: ['/ocean-view-1.jpg', '/ocean-view-2.jpg', '/ocean-view-3.jpg'],
    rating: 4.8,
    reviews: 92,
  },
  {
    id: '202',
    type: 'Family Suite',
    description: 'Spacious suite with separate kids area',
    price: 43210,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Sofa Bed', 'Kitchenette'],
    image: '/family-suite.jpg',
    size: '950 sq ft',
    beds: '1 King Bed + 2 Twin Beds',
    maxGuests: 5,
    details: 'Designed for families, this suite features a separate sleeping area for children with two twin beds. Parents enjoy a king-size bed in the private master area. Includes kitchenette for convenience.',
    images: ['/family-suite-1.jpg', '/family-suite-2.jpg', '/family-suite-3.jpg'],
    rating: 4.6,
    reviews: 78,
  },
  {
    id: '203',
    type: 'Executive',
    description: 'Productive workspace with premium amenities',
    price: 28750,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Desk', 'Printer Access'],
    image: '/executive-room.jpg',
    size: '420 sq ft',
    beds: '1 Queen Bed',
    maxGuests: 2,
    details: 'Ideal for business travelers, featuring an ergonomic work desk, high-speed internet, and access to business services. After work, relax in the comfortable queen bed with premium linens.',
    images: ['/executive-1.jpg', '/executive-2.jpg'],
    rating: 4.4,
    reviews: 65,
  },
  {
    id: '204',
    type: 'Garden View',
    description: 'Peaceful room overlooking lush gardens',
    price: 19500,
    amenities: ['WiFi', 'TV', 'AC', 'Safe', 'Balcony'],
    image: '/garden-view-room.jpg',
    size: '350 sq ft',
    beds: '1 King Bed or 2 Twins',
    maxGuests: 2,
    details: 'Escape to tranquility in this garden-facing room. Features a private balcony overlooking our meticulously maintained gardens, perfect for morning coffee or evening relaxation.',
    images: ['/garden-view-1.jpg', '/garden-view-2.jpg'],
    rating: 4.7,
    reviews: 103,
  },
  {
    id: '205',
    type: 'Penthouse',
    description: 'Ultimate luxury with panoramic city views',
    price: 92500,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony', 'Butler Service', 'Private Jacuzzi'],
    image: '/penthouse.jpg',
    size: '1800 sq ft',
    beds: '1 King Bed',
    maxGuests: 4,
    details: 'Our crown jewel, the Penthouse offers unparalleled luxury with 360-degree city views, a private jacuzzi on the terrace, gourmet kitchen, and personalized butler service. Includes access to exclusive amenities.',
    images: ['/deluxe-room.jpg', '/deluxe-room.jpg', '/deluxe-room.jpg', '/deluxe-room.jpg'],
    rating: 4.97,
    reviews: 42,
  }
];

export const formatKES = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount);
};

export const features = [
  { 
    icon: BedIcon, 
    label: (room) => room.beds,
    color: 'primary' 
  },
  { 
    icon: BathtubIcon, 
    label: () => 'Marble bathroom',
    color: 'primary' 
  },
  { 
    icon: WifiIcon, 
    label: () => 'Free WiFi',
    color: 'primary' 
  },
  { 
    icon: AcUnitIcon, 
    label: () => 'Climate control',
    color: 'primary' 
  },
  { 
    icon: PoolIcon, 
    label: () => 'Pool access',
    color: 'primary' 
  },
  { 
    icon: FitnessCenterIcon, 
    label: () => 'Gym access',
    color: 'primary' 
  },
];

export const amenities = [
  'WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 
  'Hairdryer', 'Balcony', 'Butler Service', 'Coffee Maker', 'Sofa Bed', 'Kitchenette', 'Desk', 'Printer Access', 'Private Jacuzzi'
];

export const roomTypes = [
  'All', 'Single', 'Double', 'Suite', 'Deluxe', 'Presidential', 'Ocean View', 'Family Suite', 'Executive', 'Garden View', 'Penthouse'
];

export const calculateBookingTotal = (room, checkIn, checkOut) => {
  if (!checkIn || !checkOut) return null;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  if (checkOutDate <= checkInDate) return null;
  
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const subtotal = nights * room.price;
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + tax;
  
  return {
    nights,
    subtotal,
    tax,
    total
  };
};

export const initialBookingState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  adults: 1,
  children: 0,
  specialRequests: ''
};