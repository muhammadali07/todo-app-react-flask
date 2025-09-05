// Import React hooks dan komponen yang diperlukan
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoAPI from '../services/api';

/**
 * Komponen utama TodoApp yang mengelola seluruh aplikasi todo list
 * Menangani state management, API calls, dan rendering komponen child
 */
const TodoApp = () => {
  // State untuk menyimpan daftar todos
  const [todos, setTodos] = useState([]);
  // State untuk menampilkan loading indicator
  const [loading, setLoading] = useState(true);
  // State untuk menampilkan pesan error
  const [error, setError] = useState(null);
  // State untuk filter todos (all, active, completed)
  const [filter, setFilter] = useState('all');

  // Effect hook untuk memuat todos saat komponen pertama kali di-render
  useEffect(() => {
    loadTodos();
  }, []);

  /**
   * Fungsi untuk memuat semua todos dari backend API
   * Menangani loading state dan error handling
   */
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await TodoAPI.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError('Gagal memuat todos. Pastikan backend Flask berjalan di http://localhost:5001');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handler untuk menambahkan todo baru
   * @param {Object} todoData - Data todo yang akan ditambahkan
   */
  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await TodoAPI.createTodo(todoData);
      // Menambahkan todo baru ke state dengan spread operator
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (err) {
      setError('Gagal menambahkan todo');
      throw err;
    }
  };

  /**
   * Handler untuk mengupdate todo yang sudah ada
   * @param {number} todoId - ID todo yang akan diupdate
   * @param {Object} todoData - Data baru untuk todo
   */
  const handleUpdateTodo = async (todoId, todoData) => {
    try {
      const updatedTodo = await TodoAPI.updateTodo(todoId, todoData);
      // Update todo di state dengan mengganti todo yang sesuai ID
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === todoId ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Gagal memperbarui todo');
      throw err;
    }
  };

  /**
   * Handler untuk menghapus todo
   * @param {number} todoId - ID todo yang akan dihapus
   */
  const handleDeleteTodo = async (todoId) => {
    try {
      await TodoAPI.deleteTodo(todoId);
      // Hapus todo dari state dengan filter
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch (err) {
      setError('Gagal menghapus todo');
      throw err;
    }
  };

  /**
   * Fungsi untuk memfilter todos berdasarkan status
   * @returns {Array} Array todos yang sudah difilter
   */
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  /**
   * Fungsi untuk menghitung statistik todos
   * @returns {Object} Object berisi total, completed, dan active count
   */
  const getTodoStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  // Mendapatkan todos yang sudah difilter dan statistik
  const filteredTodos = getFilteredTodos();
  const stats = getTodoStats();

  // Tampilkan loading indicator jika sedang memuat data
  if (loading) {
    return (
      <div className="todo-app">
        <div className="loading">Memuat todos...</div>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>📝 Todo List</h1>
        <p>Kelola tugas Anda dengan mudah</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadTodos} className="btn btn-retry">
            Coba Lagi
          </button>
        </div>
      )}

      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Aktif</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Selesai</span>
        </div>
      </div>

      <div className="todo-form-section">
        <h2>Tambah Todo Baru</h2>
        <TodoForm onAddTodo={handleAddTodo} />
      </div>

      <div className="todo-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Semua ({stats.total})
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Aktif ({stats.active})
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Selesai ({stats.completed})
        </button>
      </div>

      <div className="todo-list-section">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' && (
              <>
                <p>🎉 Belum ada todo!</p>
                <p>Tambahkan todo pertama Anda di atas.</p>
              </>
            )}
            {filter === 'active' && (
              <>
                <p>✨ Tidak ada todo aktif!</p>
                <p>Semua tugas sudah selesai atau belum ada todo.</p>
              </>
            )}
            {filter === 'completed' && (
              <>
                <p>📋 Belum ada todo yang selesai!</p>
                <p>Selesaikan beberapa tugas untuk melihatnya di sini.</p>
              </>
            )}
          </div>
        ) : (
          <div className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;