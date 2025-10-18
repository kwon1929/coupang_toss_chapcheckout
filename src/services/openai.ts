interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
  badge?: string;
  rating?: number;
  reviews?: number;
  description?: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  products?: Product[];
}

// 상품 데이터베이스 (실제로는 백엔드 API에서 가져와야 함)
const productDatabase: { [key: string]: Product[] } = {
  skincare: [
    {
      id: 101,
      name: '라네즈 워터뱅크 블루 히알루로닉 크림',
      originalPrice: 38000,
      discountPrice: 22800,
      discountRate: 40,
      badge: '로켓배송',
      rating: 4.8,
      reviews: 8234,
      description: '건조한 피부에 깊은 수분 공급',
    },
    {
      id: 102,
      name: '토리든 다이브인 저분자 히알루론산 세럼',
      originalPrice: 25000,
      discountPrice: 16900,
      discountRate: 32,
      badge: '로켓배송',
      rating: 4.9,
      reviews: 15782,
      description: '민감성 피부에도 안전한 보습 세럼',
    },
    {
      id: 103,
      name: '코스알엑스 달팽이 크림',
      originalPrice: 32000,
      discountPrice: 18500,
      discountRate: 42,
      badge: '특가',
      rating: 4.7,
      reviews: 6521,
      description: '피부 재생과 보습을 동시에',
    },
  ],
  electronics: [
    {
      id: 201,
      name: '삼성 갤럭시 버즈2 Pro',
      originalPrice: 229000,
      discountPrice: 128000,
      discountRate: 44,
      badge: '로켓배송',
      rating: 4.8,
      reviews: 3241,
      description: '프리미엄 노이즈 캔슬링 이어폰',
    },
    {
      id: 202,
      name: '애플 에어팟 프로 2세대',
      originalPrice: 359000,
      discountPrice: 289000,
      discountRate: 19,
      badge: '로켓배송',
      rating: 4.9,
      reviews: 5632,
      description: '향상된 액티브 노이즈 캔슬링',
    },
    {
      id: 203,
      name: '소니 WH-1000XM5',
      originalPrice: 449000,
      discountPrice: 329000,
      discountRate: 27,
      badge: '특가',
      rating: 4.9,
      reviews: 2841,
      description: '업계 최고 수준의 노이즈 캔슬링',
    },
  ],
  home: [
    {
      id: 301,
      name: '다이슨 V15 무선청소기',
      originalPrice: 990000,
      discountPrice: 495000,
      discountRate: 50,
      badge: '특가',
      rating: 4.7,
      reviews: 892,
      description: '강력한 흡입력과 레이저 먼지 감지',
    },
    {
      id: 302,
      name: 'LG 코드제로 A9S',
      originalPrice: 890000,
      discountPrice: 569000,
      discountRate: 36,
      badge: '로켓배송',
      rating: 4.6,
      reviews: 1532,
      description: '5단계 스마트 인버터 모터',
    },
  ],
  food: [
    {
      id: 401,
      name: '곰곰 삼겹살 1kg',
      originalPrice: 18900,
      discountPrice: 14900,
      discountRate: 21,
      badge: '로켓프레시',
      rating: 4.8,
      reviews: 12341,
      description: '신선한 국내산 돼지고기',
    },
    {
      id: 402,
      name: '제주 한라봉 3kg',
      originalPrice: 29900,
      discountPrice: 19900,
      discountRate: 33,
      badge: '로켓프레시',
      rating: 4.7,
      reviews: 8721,
      description: '달콤한 제주 감귤',
    },
  ],
};

export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

    // 시스템 프롬프트 초기화
    this.conversationHistory.push({
      role: 'system',
      content: `당신은 쿠팡 AI 쇼핑 어시스턴트입니다. 사용자의 쇼핑 니즈를 파악하고 적절한 상품을 추천해주는 친절한 도우미입니다.

규칙:
1. 항상 친절하고 공손하게 대답하세요.
2. 사용자가 찾는 상품 카테고리를 파악하세요.
3. 상품 추천 시 카테고리를 명확히 지정하세요: skincare, electronics, home, food
4. 응답은 간결하고 명확하게 작성하세요.
5. 상품 추천이 필요한 경우 응답 마지막에 [CATEGORY:카테고리명] 형식으로 표시하세요.

예시:
- "스킨케어 제품 추천해줘" → [CATEGORY:skincare]
- "이어폰 찾고 있어" → [CATEGORY:electronics]
- "청소기 추천" → [CATEGORY:home]
- "신선식품" → [CATEGORY:food]

일반 대화는 자연스럽게 응답하고, 상품 추천이 필요할 때만 카테고리를 표시하세요.`,
    });
  }

  async sendMessage(userMessage: string): Promise<ChatResponse> {
    // API 키가 없으면 폴백 응답
    if (!this.apiKey || this.apiKey === 'your_openai_api_key_here') {
      return this.getFallbackResponse(userMessage);
    }

    // 대화 히스토리에 사용자 메시지 추가
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: this.conversationHistory,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      // 대화 히스토리에 어시스턴트 응답 추가
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      // 응답에서 카테고리 추출
      const categoryMatch = assistantMessage.match(/\[CATEGORY:(\w+)\]/);
      let cleanMessage = assistantMessage.replace(/\[CATEGORY:\w+\]/g, '').trim();
      let products: Product[] | undefined;

      if (categoryMatch) {
        const category = categoryMatch[1];
        products = productDatabase[category] || [];
      }

      return {
        message: cleanMessage,
        products,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // 에러 발생 시 폴백 응답
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): ChatResponse {
    const lowerMessage = userMessage.toLowerCase();

    // 키워드 기반 간단한 응답
    if (lowerMessage.includes('스킨') || lowerMessage.includes('화장품') || lowerMessage.includes('보습')) {
      return {
        message: '건조한 계절에 좋은 보습 스킨케어 제품을 추천해드릴게요! 피부 타입에 따라 선택하실 수 있습니다:',
        products: productDatabase.skincare,
      };
    }

    if (lowerMessage.includes('전자제품') || lowerMessage.includes('이어폰') || lowerMessage.includes('에어팟')) {
      return {
        message: '요즘 인기있는 무선 이어폰을 추천해드릴게요!',
        products: productDatabase.electronics,
      };
    }

    if (lowerMessage.includes('청소기') || lowerMessage.includes('가전')) {
      return {
        message: '강력한 흡입력의 무선 청소기를 추천해드릴게요!',
        products: productDatabase.home,
      };
    }

    if (lowerMessage.includes('음식') || lowerMessage.includes('식품') || lowerMessage.includes('고기') || lowerMessage.includes('과일')) {
      return {
        message: '신선하고 맛있는 식품을 추천해드릴게요!',
        products: productDatabase.food,
      };
    }

    return {
      message: '더 구체적으로 말씀해주시면 더 좋은 제품을 추천해드릴 수 있어요. 예를 들어 "스킨케어 제품 추천해줘" 또는 "이어폰 찾고 있어" 같이 말씀해주세요!',
    };
  }

  clearHistory() {
    this.conversationHistory = this.conversationHistory.slice(0, 1); // 시스템 메시지만 유지
  }
}

export const openAIService = new OpenAIService();
