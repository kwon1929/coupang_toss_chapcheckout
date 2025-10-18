import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { CreditCard, Smartphone, Wallet, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PaymentDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDialog({ product, open, onOpenChange }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      setTimeout(() => {
        setIsComplete(false);
        onOpenChange(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>결제하기</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Product Info */}
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop"
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2 mb-1">{product.name}</p>
                  <p className="text-[#00bac7]">₩{product.discountPrice.toLocaleString()}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="mb-3 text-sm">결제 수단</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-[#00bac7] cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 flex-1 cursor-pointer">
                        <CreditCard className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">신용/체크카드</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-[#00bac7] cursor-pointer">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone" className="flex items-center gap-2 flex-1 cursor-pointer">
                        <Smartphone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">휴대폰 결제</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-3 hover:border-[#00bac7] cursor-pointer">
                      <RadioGroupItem value="kakao" id="kakao" />
                      <Label htmlFor="kakao" className="flex items-center gap-2 flex-1 cursor-pointer">
                        <Wallet className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">카카오페이</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">상품금액</span>
                  <span>₩{product.discountPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">배송비</span>
                  <span className="text-green-600">무료</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span>최종 결제금액</span>
                  <span className="text-[#ff6b00] text-lg">₩{product.discountPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#ff6b00] hover:bg-[#e56000] text-white py-6"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    결제 처리 중...
                  </span>
                ) : (
                  `₩${product.discountPrice.toLocaleString()} 결제하기`
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">결제가 완료되었습니다!</h3>
            <p className="text-gray-600 text-sm">빠른 배송으로 보내드릴게요 😊</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
