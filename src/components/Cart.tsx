import { ShoppingBag } from 'lucide-react';

export function Cart() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-lg">장바구니</h1>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500 mb-3">장바구니가 비어있습니다</p>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-full">
          <p className="text-sm font-medium">AI 쇼핑 어시스턴트에게 물어보세요!</p>
        </div>
      </div>
    </div>
  );
}
