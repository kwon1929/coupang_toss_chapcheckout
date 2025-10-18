import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { ProductRecommendation } from './ProductRecommendation';
import { PaymentDialog } from './PaymentDialog';
import { openAIService } from '../services/openai';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  products?: any[];
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: '안녕하세요! 쿠팡 AI 쇼핑 어시스턴트입니다. 😊\n어떤 제품을 찾고 계신가요?',
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
    };

    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // OpenAI API 호출
      const response = await openAIService.sendMessage(currentInput);

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.message,
        products: response.products,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // 에러 발생 시 폴백 메시지
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6b00] to-[#00bac7] text-white">
          <div className="flex items-center gap-2 px-4 py-4">
            <Sparkles className="w-5 h-5" />
            <h1 className="text-lg">AI 쇼핑 어시스턴트</h1>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-[#ff6b00] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-line text-sm">{message.content}</p>

                {message.products && (
                  <div className="mt-3 space-y-3">
                    {message.products.map((product) => (
                      <ProductRecommendation
                        key={product.id}
                        product={product}
                        onBuyNow={handleBuyNow}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3 rounded-bl-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">답변을 생성하고 있습니다...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="스킨케어 추천해줘"
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#00bac7] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-[#ff6b00] hover:bg-[#e56000] rounded-full px-5 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <PaymentDialog
          product={selectedProduct}
          open={showPayment}
          onOpenChange={setShowPayment}
        />
      )}
    </>
  );
}
