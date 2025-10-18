import { useState } from 'react';
import { Home } from './components/Home';
import { ChatAssistant } from './components/ChatAssistant';
import { Cart } from './components/Cart';
import { Search, Home as HomeIcon, ShoppingCart, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'cart'>('home');

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Main Content */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'chat' && <ChatAssistant />}
      {activeTab === 'cart' && <Cart />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-2 ${
              activeTab === 'home' ? 'text-[#ff6b00]' : 'text-gray-500'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 py-2 text-gray-500">
            <Search className="w-5 h-5" />
            <span className="text-xs">검색</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 py-2 ${
              activeTab === 'chat' ? 'text-[#00bac7]' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">AI 쇼핑</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center gap-1 py-2 ${
              activeTab === 'cart' ? 'text-[#ff6b00]' : 'text-gray-500'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">장바구니</span>
          </button>
        </div>
      </div>
    </div>
  );
}
