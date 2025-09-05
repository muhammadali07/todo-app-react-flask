# Import library yang diperlukan untuk Flask API
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS

# Inisialisasi aplikasi Flask
app = Flask(__name__)
# Konfigurasi CORS untuk mengizinkan request dari frontend
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

# Route untuk halaman utama
@app.route('/')
def index():
    """Endpoint untuk halaman utama yang menampilkan pesan hello world"""
    return 'hello world'


# Storage untuk menyimpan data todos dalam memory
todos_storage = []
# Counter untuk ID todo berikutnya
next_id = 1


def createTodoObject(title="", description="", completed=False, todo_id=None):
    """
    Membuat object todo baru dengan struktur data yang konsisten
    
    Args:
        title (str): Judul todo
        description (str): Deskripsi todo
        completed (bool): Status penyelesaian todo
        todo_id (int): ID todo (opsional, akan di-generate otomatis jika tidak disediakan)
    
    Returns:
        dict: Object todo dengan semua properti yang diperlukan
    """
    global next_id
    if todo_id is None:
        todo_id = next_id
        next_id += 1
    return {
        "id": todo_id,
        "title": title,
        "description": description,
        "completed": completed,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }

def find_todo_by_id(todo_id):
    """
    Mencari todo berdasarkan ID
    
    Args:
        todo_id (int): ID todo yang dicari
    
    Returns:
        dict or None: Object todo jika ditemukan, None jika tidak ditemukan
    """
    for todo in todos_storage:
        if todo["id"] == todo_id:
            return todo
    return None

@app.route('/api/todos', methods=['GET'])
def get_todos():
    """
    Endpoint untuk mengambil semua data todos
    
    Returns:
        JSON: List semua todos dalam format JSON
    """
    return jsonify(todos_storage)

@app.route('/api/todos', methods=['POST'])
def create_todo():
    """
    Endpoint untuk membuat todo baru
    
    Request Body:
        title (str): Judul todo (wajib)
        description (str): Deskripsi todo (opsional)
        completed (bool): Status penyelesaian (opsional, default: False)
    
    Returns:
        JSON: Object todo yang baru dibuat dengan status 201
        JSON: Error message dengan status 400 jika title tidak disediakan
    """
    data = request.get_json()
    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400

    # Membuat object todo baru
    todo = createTodoObject(
        title = data.get("title"),
        description = data.get("description", ""),
        completed = data.get("completed", False)
    )
    todos_storage.append(todo)
    return jsonify(todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """
    Endpoint untuk mengupdate todo berdasarkan ID
    
    Args:
        todo_id (int): ID todo yang akan diupdate
    
    Request Body:
        title (str): Judul todo baru
        description (str): Deskripsi todo baru
        completed (bool): Status penyelesaian baru
    
    Returns:
        JSON: Object todo yang telah diupdate
        JSON: Error message dengan status 404 jika todo tidak ditemukan
    """
    todo = find_todo_by_id(todo_id)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    
    data = request.get_json()
    # Update properti todo dengan data baru
    todo["title"] = data.get("title")
    todo["description"] = data.get("description", "")
    todo["completed"] = data.get("completed", False)
    todo["updated_at"] = datetime.now()
    return jsonify(todo)

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """
    Endpoint untuk menghapus todo berdasarkan ID
    
    Args:
        todo_id (int): ID todo yang akan dihapus
    
    Returns:
        JSON: Pesan konfirmasi penghapusan dengan status 200
        JSON: Error message dengan status 404 jika todo tidak ditemukan
    """
    todo = find_todo_by_id(todo_id)
    if todo is None:
        return jsonify({"error": "Todo not found"}), 404
    
    # Hapus todo dari storage
    todos_storage.remove(todo)
    return jsonify({"message": "Todo deleted"}), 200
    

# Menjalankan aplikasi Flask jika file ini dieksekusi langsung
if __name__ == '__main__':
    app.run(debug=True, port=5001)