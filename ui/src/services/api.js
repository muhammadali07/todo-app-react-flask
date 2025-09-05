// Base URL untuk API backend Flask
const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Class untuk mengelola semua API calls ke backend Flask
 * Menyediakan methods untuk CRUD operations pada todos
 */
class TodoAPI {
  /**
   * Mengambil semua todos dari backend
   * @returns {Promise<Array>} Array berisi semua todos
   */
  async getAllTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  /**
   * Membuat todo baru di backend
   * @param {Object} todoData - Data todo yang akan dibuat
   * @param {string} todoData.title - Judul todo
   * @param {string} todoData.description - Deskripsi todo
   * @param {boolean} todoData.completed - Status penyelesaian
   * @returns {Promise<Object>} Todo yang baru dibuat
   */
  async createTodo(todoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  /**
   * Mengupdate todo yang sudah ada di backend
   * @param {number} todoId - ID todo yang akan diupdate
   * @param {Object} todoData - Data todo yang baru
   * @returns {Promise<Object>} Todo yang sudah diupdate
   */
  async updateTodo(todoId, todoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  /**
   * Menghapus todo dari backend
   * @param {number} todoId - ID todo yang akan dihapus
   * @returns {Promise<Object>} Response konfirmasi penghapusan
   */
  async deleteTodo(todoId) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}

// Export instance dari TodoAPI class untuk digunakan di komponen lain
export default new TodoAPI();