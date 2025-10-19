import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function PaymentFail() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message') || '결제에 실패했습니다.';
    setErrorMessage(message);
  }, []);

  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3">결제 실패</h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <Button
          onClick={handleGoBack}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
        >
          다시 시도하기
        </Button>
      </div>
    </div>
  );
}
