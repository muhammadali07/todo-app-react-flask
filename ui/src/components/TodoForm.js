// Import React dan useState hook
import React, { useState } from 'react';

/**
 * Komponen form untuk menambahkan todo baru
 * @param {Function} onAddTodo - Callback function yang dipanggil saat form disubmit
 */
const TodoForm = ({ onAddTodo }) => {
  // State untuk menyimpan judul todo
  const [title, setTitle] = useState('');
  // State untuk menyimpan deskripsi todo
  const [description, setDescription] = useState('');
  // State untuk menampilkan loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handler untuk submit form todo baru
   * @param {Event} e - Event object dari form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi: pastikan title tidak kosong
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      // Panggil callback function dengan data todo
      await onAddTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false
      });
      // Reset form setelah berhasil submit
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* Input field untuk judul todo */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Masukkan judul todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          disabled={isSubmitting}
        />
      </div>
      {/* Textarea untuk deskripsi todo */}
      <div className="form-group">
        <textarea
          placeholder="Deskripsi (opsional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
          disabled={isSubmitting}
        />
      </div>
      {/* Button submit dengan loading state */}
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={!title.trim() || isSubmitting}
      >
        {isSubmitting ? 'Menambahkan...' : 'Tambah Todo'}
      </button>
    </form>
  );
};

export default TodoForm;