// Import React dan useState hook
import React, { useState } from 'react';

/**
 * Komponen untuk menampilkan dan mengelola satu item todo
 * @param {Object} todo - Object todo yang berisi data todo
 * @param {Function} onUpdateTodo - Callback function untuk update todo
 * @param {Function} onDeleteTodo - Callback function untuk delete todo
 */
const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  // State untuk mode editing
  const [isEditing, setIsEditing] = useState(false);
  // State untuk menyimpan judul saat editing
  const [editTitle, setEditTitle] = useState(todo.title);
  // State untuk menyimpan deskripsi saat editing
  const [editDescription, setEditDescription] = useState(todo.description);
  // State untuk loading saat update
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Handler untuk toggle status completed todo
   */
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      // Update status completed dengan nilai kebalikannya
      await onUpdateTodo(todo.id, {
        ...todo,
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Handler untuk menyimpan perubahan saat editing
   */
  const handleSaveEdit = async () => {
    // Validasi: pastikan title tidak kosong
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    try {
      // Update todo dengan data yang sudah diedit
      await onUpdateTodo(todo.id, {
        ...todo,
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      // Keluar dari mode editing
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Handler untuk membatalkan editing dan reset form
   */
  const handleCancelEdit = () => {
    // Reset form ke nilai original
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  /**
   * Handler untuk menghapus todo dengan konfirmasi
   */
  const handleDelete = async () => {
    // Tampilkan konfirmasi sebelum menghapus
    if (window.confirm('Apakah Anda yakin ingin menghapus todo ini?')) {
      try {
        await onDeleteTodo(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  /**
   * Fungsi untuk memformat tanggal ke format Indonesia
   * @param {string} dateString - String tanggal yang akan diformat
   * @returns {string} Tanggal yang sudah diformat
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {/* Checkbox untuk toggle status completed */}
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating || isEditing}
          />
        </div>
        
        {/* Conditional rendering: form editing atau tampilan normal */}
        {isEditing ? (
          <div className="todo-edit-form">
            {/* Input untuk edit judul */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input"
              disabled={isUpdating}
            />
            {/* Textarea untuk edit deskripsi */}
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-textarea"
              rows="2"
              disabled={isUpdating}
            />
            {/* Button untuk save dan cancel */}
            <div className="edit-buttons">
              <button 
                onClick={handleSaveEdit}
                className="btn btn-save"
                disabled={!editTitle.trim() || isUpdating}
              >
                {isUpdating ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button 
                onClick={handleCancelEdit}
                className="btn btn-cancel"
                disabled={isUpdating}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-details">
            {/* Judul todo */}
            <h3 className="todo-title">{todo.title}</h3>
            {/* Deskripsi todo (jika ada) */}
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            {/* Metadata tanggal */}
            <div className="todo-meta">
              <span className="todo-date">
                Dibuat: {formatDate(todo.created_at)}
              </span>
              {/* Tampilkan tanggal update jika berbeda dengan created_at */}
              {todo.updated_at !== todo.created_at && (
                <span className="todo-date">
                  Diperbarui: {formatDate(todo.updated_at)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Action buttons (hanya tampil jika tidak sedang editing) */}
      {!isEditing && (
        <div className="todo-actions">
          <button 
            onClick={() => setIsEditing(true)}
            className="btn btn-edit"
            disabled={isUpdating}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="btn btn-delete"
            disabled={isUpdating}
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;