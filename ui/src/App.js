// Import React dan komponen yang diperlukan
import React from 'react';
import TodoApp from './components/TodoApp';
import './TodoApp.css';

/**
 * Komponen utama aplikasi React
 * Berfungsi sebagai root component yang merender TodoApp
 */
function App() {
  return (
    <div className="App">
      {/* Render komponen TodoApp sebagai aplikasi utama */}
      <TodoApp />
    </div>
  );
}

export default App;
