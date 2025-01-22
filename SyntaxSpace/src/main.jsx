// import '@fontsource/inter/variable.css'; // Inter with weight and style variability
// import '@fontsource/poppins'; // Poppins
// import '@fontsource/playfair-display'; // Playfair Display
// import '@fontsource/source-sans-pro'; // Source Sans Pro
// import '@fontsource/dm-sans'; // DM Sans
// import '@fontsource/dm-serif-display'; // DM Serif Display
// import '@fontsource/roboto'; // For body
// import '@fontsource/merriweather'; // For headings


import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store/store';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ScrollArea className="h-screen overflow-auto">
      <div className="font-playfair"> {/* Playfair Display for headings */}
        <App />
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  </Provider>
);
