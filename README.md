
# Interactive Payment Popup with AI Shopping Assistant

This is a code bundle for Interactive Payment Popup with OpenAI GPT integration. The original project is available at https://www.figma.com/design/ere4C9tcpWTki0roI1bcH2/Interactive-Payment-Popup.

## Features

- 🛍️ **AI Shopping Assistant**: GPT-powered chatbot that recommends products based on user queries
- 💳 **Interactive Payment Flow**: Smooth payment dialog with multiple payment method options
- 📱 **Mobile-first Design**: Responsive UI optimized for mobile devices
- 🎨 **Modern UI Components**: Built with Radix UI and Tailwind CSS

## Tech Stack

- **Framework**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-4o-mini API

## Setup Instructions

### 1. Install Dependencies

```bash
npm i
```

### 2. Configure OpenAI API Key

1. Copy the `.env.example` file to create a `.env` file:

```bash
cp .env.example .env
```

2. Get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

3. Add your API key to the `.env` file:

```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

**Note**: The app will work without an API key using a fallback keyword-based system, but for the full AI experience, you need a valid OpenAI API key.

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## How to Use

1. **Home Tab**: Browse products and view promotions
2. **AI Shopping Tab**: Chat with the AI assistant to get personalized product recommendations
   - Try asking: "스킨케어 추천해줘" (Recommend skincare)
   - Or: "이어폰 찾고 있어" (Looking for earphones)
3. **Cart Tab**: View your shopping cart (currently empty state)

## Project Structure

```
src/
├── components/
│   ├── ChatAssistant.tsx       # AI chat interface with GPT integration
│   ├── Home.tsx                # Main product listing page
│   ├── Cart.tsx                # Shopping cart page
│   ├── PaymentDialog.tsx       # Payment modal with animations
│   ├── ProductCard.tsx         # Product display component
│   └── ui/                     # Reusable UI components (Radix UI)
├── services/
│   └── openai.ts               # OpenAI API service with fallback
├── App.tsx                     # Main app with bottom navigation
└── main.tsx                    # App entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `build/` directory.

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (optional, uses fallback if not provided)

## Notes

- This is a prototype/demo application
- Payment processing is simulated (no real transactions)
- Product data is hardcoded for demonstration purposes
- The AI assistant uses GPT-4o-mini for cost-effective conversational AI
