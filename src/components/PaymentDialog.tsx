import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CreditCard, Wallet, Zap, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { loadTossPayments } from '@tosspayments/payment-sdk';

interface PaymentDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDialog({ product, open, onOpenChange }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('coupay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 퀵계좌이체 선택 시 토스페이먼츠 연동
      if (paymentMethod === 'quick-transfer') {
        console.log('퀵계좌이체 결제 시작');
        const tossPayments = await loadTossPayments(clientKey);

        const paymentData = {
          amount: product.discountPrice,
          orderId: `ORDER_${Date.now()}`,
          orderName: product.name,
          customerName: '홍길동',
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
        };

        console.log('결제 데이터:', paymentData);

        // 계좌이체 결제 요청
        await tossPayments.requestPayment('계좌이체', paymentData);
      } else {
        // 다른 결제 수단은 기존 로직
        setTimeout(() => {
          setIsProcessing(false);
          setIsComplete(true);

          setTimeout(() => {
            setIsComplete(false);
            onOpenChange(false);
          }, 2000);
        }, 1500);
      }
    } catch (error) {
      console.error('결제 오류:', error);
      setIsProcessing(false);

      // 사용자가 결제를 취소한 경우
      if (error instanceof Error && error.message.includes('USER_CANCEL')) {
        alert('결제가 취소되었습니다.');
      } else {
        alert('결제 중 오류가 발생했습니다: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
      }
    }
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
                <h3 className="mb-3 text-sm font-semibold">결제 수단</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {/* 쿠페이 */}
                    <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer transition-colors">
                      <RadioGroupItem value="coupay" id="coupay" />
                      <Label htmlFor="coupay" className="flex items-center justify-between flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium">쿠페이</span>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 text-xs px-2 py-0.5 font-semibold">
                          💰 1% 머니 적립
                        </Badge>
                      </Label>
                    </div>

                    {/* 퀵계좌이체 */}
                    <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer transition-colors">
                      <RadioGroupItem value="quick-transfer" id="quick-transfer" />
                      <Label htmlFor="quick-transfer" className="flex items-center justify-between flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium">퀵계좌이체</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs px-2 py-0.5 font-semibold">
                          등록완료 · 추가등록 불필요
                        </Badge>
                      </Label>
                    </div>

                    {/* 신용카드 */}
                    <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 flex-1 cursor-pointer">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">신용/체크카드</span>
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
                  <span className="font-semibold">최종 결제금액</span>
                  <span className="text-blue-600 text-lg font-bold">₩{product.discountPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-bold shadow-lg border-0"
                style={{ backgroundColor: '#3b82f6' }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>결제 처리 중...</span>
                  </span>
                ) : (
                  <span>₩{product.discountPrice.toLocaleString()} 결제하기</span>
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
