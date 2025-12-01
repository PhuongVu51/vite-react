# Quick Start Guide - CourseMS React

## Running the Application

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. First Time Use

1. Click **"Sign up"** on the login page
2. Fill in your teacher information:
   - Full Name: Enter your name
   - Email: Enter an email address
   - Password: Enter a password
   - Date of Birth: (Optional)
   - Gender: Select your gender
   - Subject(s): Enter subjects you teach (e.g., Math, English)
3. Click **"Sign Up"**
4. You'll be redirected to login automatically
5. Login with your email and password

### 4. Using the Dashboard

After login, you'll see three main options:

#### 🎓 Manage Students
- Add students with ID code, name, email, and class
- Edit or delete student information
- View all students in a table

#### 📝 Manage Exams
- Create exams with title, subject, and date
- Edit or delete exam details
- View all exams

#### 🏫 Manage Classes
- Create new classes
- View all your classes
- Delete classes as needed

## Key Differences from PHP Version

| Feature | PHP Version | React Version |
|---------|-------------|---------------|
| Database | MySQL Server | Browser localStorage |
| Authentication | Session cookies | Context API + sessionStorage |
| Routing | Server-side (PHP files) | Client-side (React Router) |
| Storage | Persistent (MySQL) | Persistent (localStorage) |
| Backend | PHP + Apache | Frontend only (no backend needed) |

## Data Storage Location

- **localStorage**: Stores all data (students, exams, classes, teachers)
- **sessionStorage**: Stores current user session
- Browser DevTools → Application → Storage to view data

## Logging Out

Click the **"Log out"** button in the top-right corner of any page to:
- Clear your session
- Return to the login page

## Browser Data

To clear all application data:
1. Open DevTools (F12)
2. Go to Application → Storage → Local Storage
3. Find `coursems_db` and delete it
4. Refresh the page

## Common Tasks

### Reset All Data
```javascript
// In browser console:
localStorage.removeItem('coursems_db');
sessionStorage.removeItem('coursems_session');
location.reload();
```

### Check Stored Data
```javascript
// In browser console:
JSON.parse(localStorage.getItem('coursems_db'))
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm lint
```

## Keyboard Shortcuts

- **Ctrl+Shift+K**: Toggle DevTools
- **F5**: Refresh page (keeps data)
- **Ctrl+Shift+Delete**: Open Clear Browsing Data

## Tips

1. **Backup Data**: Use browser DevTools to export localStorage data
2. **Multiple Accounts**: Register multiple teacher accounts to test
3. **Test Data**: Create sample students and exams to understand the system
4. **CSS Customization**: Edit `src/styles/` files to change colors/layout

## Troubleshooting

**Q: Page shows blank/nothing**
- Clear browser cache: Ctrl+Shift+Delete
- Refresh: F5
- Check DevTools for errors: F12

**Q: Lost all my data**
- Data is stored in localStorage and should persist
- Check if incognito/private mode (data cleared on close)
- Try different browser

**Q: Can't login**
- Make sure you registered first
- Check email spelling matches exactly
- Clear sessionStorage: `sessionStorage.clear()` in console

**Q: Want to start fresh**
- Clear all data: `localStorage.clear()` in console
- Refresh: F5
- Register new account

## Next Steps

1. Explore all three management modules
2. Create sample data (students, exams, classes)
3. Try editing and deleting entries
4. Understand how data persists across page refreshes

Enjoy using CourseMS! 🐝
