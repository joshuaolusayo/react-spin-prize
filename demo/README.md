# Demo Site for react-spinner-prize-wheel

This folder contains the demo/playground website for the package.

## Deployment Options

### Option 1: GitHub Pages (Recommended - FREE)

1. **In your GitHub repo**, enable GitHub Pages:
   - Settings → Pages → Source: `main` branch → `/demo` folder
   - Your demo will be at: `https://joshuaolusayo.github.io/react-spinner-prize-wheel/`

2. **Update demo to use published package**:
   ```html
   <script type="module">
     import { SpinnerWheel } from 'https://cdn.jsdelivr.net/npm/react-spinner-prize-wheel@1.0.0/+esm'
   </script>
   ```

### Option 2: Vercel (Free)

```bash
npm install -g vercel
cd demo
vercel
```

### Option 3: CodeSandbox

Create a CodeSandbox with your package:
https://codesandbox.io/s/react-spinner-prize-wheel-demo

### Option 4: StackBlitz

Create a StackBlitz project:
https://stackblitz.com/edit/react-spinner-prize-wheel

## After Publishing to npm

Update the demo to actually import from npm:

```html
<script type="module">
  import { SpinnerWheel } from 'https://esm.sh/react-spinner-prize-wheel@1.0.0';
  // Your demo code
</script>
```

## Add to README

Add this to your main README.md:

```markdown
## 🎮 Live Demo

Check out the interactive demo: [https://joshuaolusayo.github.io/react-spinner-prize-wheel/](https://joshuaolusayo.github.io/react-spinner-prize-wheel/)

Or try it on:
- [CodeSandbox](https://codesandbox.io/s/react-spinner-prize-wheel-demo)
- [StackBlitz](https://stackblitz.com/edit/react-spinner-prize-wheel)
```
