import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductRecommendationProps {
  product: any;
  onBuyNow: (product: any) => void;
}

export function ProductRecommendation({ product, onBuyNow }: ProductRecommendationProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop"
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
            <p className="text-xs text-gray-800 line-clamp-2 mb-1">{product.name}</p>
            {product.description && (
              <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500 text-sm">{product.discountRate}%</span>
            <span className="text-gray-400 line-through text-xs">
              ₩{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-[#00bac7]">₩{product.discountPrice.toLocaleString()}</p>
          
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400">({product.reviews?.toLocaleString()})</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => onBuyNow(product)}
          className="bg-[#ff6b00] hover:bg-[#e56000] text-white px-4 py-2 h-auto text-sm"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          바로구매
        </Button>
      </div>
    </div>
  );
}
