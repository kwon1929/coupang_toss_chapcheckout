import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCard } from './ProductCard';
import { ChevronRight, Rocket, TrendingUp, Award, Star } from 'lucide-react';

const categories = [
  { icon: Rocket, label: '로켓배송', color: 'text-blue-500' },
  { icon: TrendingUp, label: '로켓프레시', color: 'text-green-500' },
  { icon: Award, label: '금주의특가', color: 'text-purple-500' },
  { icon: Star, label: '무한이벤트', color: 'text-yellow-500' },
];

const products = [
  {
    id: 1,
    name: '곰곰 삼각김밥 참치마요 (냉장) 120g',
    originalPrice: 3000,
    discountPrice: 1900,
    discountRate: 36,
    badge: '로켓배송',
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: 2,
    name: '백설 고소한 참기름 500ml',
    originalPrice: 32000,
    discountPrice: 19900,
    discountRate: 50,
    badge: '로켓배송',
    rating: 4.9,
    reviews: 3521,
  },
  {
    id: 3,
    name: '다이슨 청소기 V15',
    originalPrice: 990000,
    discountPrice: 495000,
    discountRate: 50,
    badge: '특가',
    rating: 4.7,
    reviews: 892,
  },
  {
    id: 4,
    name: '삼성전자 갤럭시 버즈 Pro 2',
    originalPrice: 229000,
    discountPrice: 128000,
    discountRate: 44,
    badge: '로켓배송',
    rating: 4.6,
    reviews: 2341,
  },
];

export function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1">
            <span className="text-[#ff6b00]">cou</span>
            <span className="text-[#00bac7]">pang</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>

      {/* Banner */}
      <div className="relative bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 mx-4 mt-4 rounded-xl p-6 overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl">🍎</div>
        <div className="absolute bottom-4 right-8 text-3xl">🍋</div>
        <div className="absolute top-1/2 right-12 text-2xl">🥕</div>
        <div className="relative">
          <p className="text-sm text-gray-700 mb-1">신선식품 아무리 담아도 무료배송!</p>
          <p className="text-orange-500 mb-1">
            <span className="text-2xl font-bold">국민템 최대 50%</span>
            <span className="ml-1">할인</span>
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${category.color}`}>
              <category.icon className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-700">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Dyson Banner */}
      <div className="mx-4 mb-6 bg-yellow-300 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm mb-1 font-semibold">dyson</p>
          <p className="mb-1 font-bold">청소기 50% 할인특가</p>
        </div>
        <ChevronRight className="w-5 h-5" />
      </div>

      {/* Coupang Play Banner */}
      <div className="mx-4 mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-xl p-4 flex items-center justify-between text-white">
        <div>
          <p className="text-xs mb-1 font-semibold">coupang play</p>
          <p className="font-bold">첫달 무료체험!</p>
        </div>
        <ChevronRight className="w-5 h-5" />
      </div>

      {/* Today's Deals Section */}
      <div className="px-4 mb-4">
        <h2 className="mb-4">오늘의 쇼핑 추천</h2>
      </div>

      {/* Products */}
      <div className="px-4 space-y-4 pb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
