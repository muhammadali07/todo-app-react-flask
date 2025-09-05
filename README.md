# 📝 Todo App - React & Flask

Aplikasi Todo List modern yang dibangun dengan React.js untuk frontend dan Flask untuk backend API.

## 🚀 Fitur

- ✅ Tambah, edit, dan hapus todo
- 🔄 Toggle status completed/active
- 🔍 Filter berdasarkan status (Semua, Aktif, Selesai)
- 📊 Dashboard statistik
- 📱 Responsive design
- 🎨 UI modern dengan gradient dan glass morphism
- ⚡ Real-time synchronization dengan backend

## 🛠️ Tech Stack

### Frontend
- React.js 19.1.1
- CSS3 dengan modern styling
- Fetch API untuk HTTP requests

### Backend
- Flask (Python)
- Flask-CORS untuk cross-origin requests
- In-memory storage (dapat diupgrade ke database)

## 📦 Instalasi

### Prerequisites
- Node.js (v14 atau lebih baru)
- Python 3.9+
- npm atau yarn

### Backend Setup

1. Masuk ke folder backend:
   ```bash
   cd be
   ```

2. Aktifkan virtual environment:
   ```bash
   source env/bin/activate  # Linux/Mac
   # atau
   env\Scripts\activate     # Windows
   ```

3. Install dependencies:
   ```bash
   pip install flask flask-cors
   ```

4. Jalankan server:
   ```bash
   python main.py
   ```
   Server akan berjalan di `http://localhost:5001`

### Frontend Setup

1. Masuk ke folder frontend:
   ```bash
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm start
   ```
   Aplikasi akan terbuka di `http://localhost:3000`

## 🔧 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|----------|
| GET | `/api/todos` | Ambil semua todos |
| POST | `/api/todos` | Buat todo baru |
| PUT | `/api/todos/<id>` | Update todo |
| DELETE | `/api/todos/<id>` | Hapus todo |

### Contoh Request Body

**POST/PUT `/api/todos`:**
```json
{
  "title": "Belajar React",
  "description": "Menyelesaikan tutorial React hooks",
  "completed": false
}
```

## 📁 Struktur Project

```
codingFirst/
├── be/                 # Backend Flask
│   ├── env/           # Virtual environment
│   └── main.py        # Flask application
├── ui/                # Frontend React
│   ├── public/        # Static files
│   └── src/
│       ├── components/    # React components
│       ├── services/      # API services
│       └── TodoApp.css    # Styling
├── .gitignore
└── README.md
```

## 🎨 Screenshots

*Todo App menampilkan interface modern dengan gradient background, card-based layout, dan fitur filtering yang intuitif.*

## 🚀 Deployment

### Backend
- Deploy ke Heroku, Railway, atau platform Python hosting lainnya
- Pastikan untuk mengatur environment variables
- Update CORS settings untuk production domain

### Frontend
- Deploy ke Netlify, Vercel, atau GitHub Pages
- Update API base URL untuk production backend
- Build dengan `npm run build`

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Project ini menggunakan MIT License.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk belajar full-stack development dengan React dan Flask.