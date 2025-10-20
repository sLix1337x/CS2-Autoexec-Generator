# CS2 Autoexec Generator

A modern web application for generating custom Counter-Strike 2 autoexec.cfg files with advanced configuration options.

## Features

This generator includes comprehensive settings for:

- **Key Bindings**: Communication, utility, movement, and weapon bindings
- **Custom Key Bindings**: Add your own custom commands and bindings
- **Network Rate Settings**: Optimize your connection with rate, cmdrate, and updaterate
- **Sound Settings**: Configure game volume and audio options
- **Mouse & Crosshair Settings**: Customize sensitivity and detailed crosshair parameters
- **HUD Settings**: Basic HUD configuration options
- **HUD & UI Advanced Settings**: 
  - Console settings and developer options
  - HUD appearance customization
  - Radar configuration
  - Team ID display options
  - Viewmodel positioning
  - First-person tracers
- **Video Settings**: Performance and visual options
- **Additional Commands**: Add any other console commands not covered by the UI

## Technologies

Built with:

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Hook Form](https://react-hook-form.com/) - Form state management
- [Zod](https://github.com/colinhacks/zod) - Schema validation
- [Radix UI](https://www.radix-ui.com/) - UI component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

1. Configure your settings using the form interface
2. Generate your autoexec.cfg file with organized sections and comments
3. Download and place in your CS2 config directory

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT
