import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';

export function PaymentSuccess() {
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    // URL에서 결제 정보 파싱
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const amount = urlParams.get('amount');
    const paymentKey = urlParams.get('paymentKey');

    setPaymentInfo({ orderId, amount, paymentKey });
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3">결제가 완료되었습니다!</h1>
        <p className="text-gray-600 mb-6">주문하신 상품을 빠르게 배송해드리겠습니다.</p>

        {paymentInfo && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">주문번호</span>
                <span className="font-medium">{paymentInfo.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제금액</span>
                <span className="font-medium">₩{Number(paymentInfo.amount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleGoHome}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
