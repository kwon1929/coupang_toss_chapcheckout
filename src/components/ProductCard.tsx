import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
  badge?: string;
  rating?: number;
  reviews?: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {product.badge && (
            <Badge className="bg-[#00bac7] text-white mb-1 text-xs px-2 py-0">
              {product.badge}
            </Badge>
          )}
          <p className="text-sm text-gray-800 line-clamp-2 mb-1">{product.name}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500">{product.discountRate}%</span>
            <span className="text-gray-400 line-through text-sm">
              ₩ {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-[#00bac7] mb-1">₩ {product.discountPrice.toLocaleString()}</p>
          
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span>({product.reviews?.toLocaleString()})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
