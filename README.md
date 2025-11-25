# react-spinner-prize-wheel

🎡 Modern, fully customizable prize wheel spinner component for React with TypeScript support.

[![npm version](https://img.shields.io/npm/v/react-spinner-prize-wheel.svg)](https://www.npmjs.com/package/react-spinner-prize-wheel)
[![npm downloads](https://img.shields.io/npm/dm/react-spinner-prize-wheel.svg)](https://www.npmjs.com/package/react-spinner-prize-wheel)
[![license](https://img.shields.io/npm/l/react-spinner-prize-wheel.svg)](https://github.com/joshuaolusayo/react-spinner-prize-wheel/blob/main/LICENSE)

## 🎮 Live Demo

- **GitHub Pages**: [https://joshuaolusayo.github.io/react-spinner-prize-wheel/](https://joshuaolusayo.github.io/react-spinner-prize-wheel/)
- **CodeSandbox**: [Try it online](https://codesandbox.io/s/react-spinner-prize-wheel)
- **StackBlitz**: [Edit in browser](https://stackblitz.com/edit/react-spinner-prize-wheel)

## Features

- 🎨 Fully customizable colors and styles
- 🎯 Precise winner selection
- 🎭 Smooth animations with easing
- 📱 Responsive and accessible
- 🔧 TypeScript support
- 🎪 Modern design with "SPIN" button in the center

## Installation

```bash
npm install react-spinner-prize-wheel
# or
yarn add react-spinner-prize-wheel
# or
pnpm add react-spinner-prize-wheel
```

## Usage

```tsx
import { SpinnerWheel } from 'react-spinner-prize-wheel';

const items = [
  { id: 1, label: 'Prize 1', color: '#FF6B6B' },
  { id: 2, label: 'Prize 2', color: '#4ECDC4' },
  { id: 3, label: 'Prize 3', color: '#45B7D1' },
  { id: 4, label: 'Prize 4', color: '#FFA07A' },
];

function App() {
  const handleSpinComplete = (item) => {
    console.log('Winner:', item);
  };

  return (
    <SpinnerWheel
      items={items}
      onSpinComplete={handleSpinComplete}
      size={500}
      duration={5000}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SpinnerWheelItem[]` | required | Array of items to display on the wheel |
| `onSpinComplete` | `(item: SpinnerWheelItem) => void` | - | Callback when spin completes |
| `spinning` | `boolean` | - | External control of spinning state |
| `duration` | `number` | 5000 | Duration of spin animation in ms |
| `size` | `number` | 500 | Size of the wheel in pixels |
| `fontSize` | `number` | 16 | Font size for item labels |
| `borderWidth` | `number` | 8 | Width of the outer border |
| `borderColor` | `string` | '#333' | Color of the border |
| `buttonText` | `string` | 'SPIN' | Text on the center button |
| `buttonColor` | `string` | '#333' | Background color of the button |
| `buttonTextColor` | `string` | '#fff' | Text color of the button |
| `disabled` | `boolean` | false | Disable the spin button |
| `winningIndex` | `number` | - | Force a specific winner (for testing) |

## SpinnerWheelItem

```typescript
interface SpinnerWheelItem {
  id: string | number;
  label: string;
  color?: string;        // Background color of the segment
  textColor?: string;    // Text color (defaults to white)
}
```

## Advanced Usage

### Customization Examples

```tsx
// Custom colors and icon
<SpinnerWheel
  items={items}
  buttonColor="#FF6B6B"
  buttonTextColor="#FFFFFF"
  buttonBorderColor="#FFD700"
  buttonBorderWidth={6}
  borderColor="#4ECDC4"
  buttonIcon={<span style={{ fontSize: "48px" }}>🎰</span>}
/>

// Custom size
<SpinnerWheel
  items={items}
  size={600}
  buttonSize={100}
  duration={8000}
/>
```

## License

MIT
