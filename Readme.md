# 👨‍💼 Employee Directory Web App

A sleek, responsive Employee Directory web interface built using **HTML**, **CSS**, **Vanilla JavaScript**, and **Freemarker Templates (Java)**. This project allows users to **Add**, **Edit**, **Delete**, **Search**, **Sort**, **Filter**, and **Paginate** through employee records — all stored in browser `localStorage`.

> 💡 _If given more time, I would have added a feature to **export all employee data to Excel** for offline access and reporting._

---

## 🚀 Features

- ✅ Add / Edit / Delete employees
- 🔍 Live search by name or email
- 📑 Sorting by first name or department
- 📊 Adjustable pagination (5 to All per page)
- 🎯 Multi-field filtering: First Name, Department, Role
- 🌗 Light/Dark theme toggle with localStorage persistence
- 🪄 Smooth animations for modals and filter sidebar
- 💾 All data stored in browser `localStorage` — no backend needed
- 📱 Responsive design for mobile & desktop

---

## 📂 Project Structure
```
employee-directory/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── demo/
│       │               ├── DemoApplication.java   # Main Spring Boot app
│       │               ├── controller/
│       │               │   └── EmployeeController.java         # Handles routes and Freemarker rendering
│
│       └── resources/
│           ├── static/
│           │   ├── css/
│           │   │   └── style.css                               # All UI styling, transitions, dark mode, etc.
│           │   └── js/
│           │       └── app.js                                  # Core logic (CRUD, filter, sort, modal, theme toggle)
│           │
│           ├── templates/
│           │   └── index.ftlh                                  # Freemarker template for rendering employee cards
│           │
│           └── application.properties                          # Spring Boot configuration
│
├── pom.xml                                                     # Maven dependencies
└── README.md                                
```


## 🚀 Setup & Run Instructions

Make sure you have **Java 17+** and **Maven** installed.

### 1. Clone the repository
```bash
git clone https://github.com/serv-er/employee-directory.git
cd employee-directory
```

### 2. Build the project
```bash
mvn clean install
```

### 3. Run the application
```bash
mvn spring-boot:run
```

### 4. Open in browser
Go to: [http://localhost:8080](http://localhost:8080)
## 🖼️ Demo Video Link
https://drive.google.com/file/d/1d-7lxU2OSCAJeiXYAXhe2KQ7JIjM08hF/view?usp=sharing


## 💭 Challenges Faced
### 🧩 Understanding Freemarker —
#### Coming from a JS-heavy background, grasping the Freemarker templating syntax and how Java feeds data into the view was initially confusing.

### ⚙️ Java Setup —
#### Setting up the Java backend (especially the Spring Boot + Freemarker integration) was a learning curve.

### 🧠 Client-side State Management — 
#### Managing all state purely in localStorage while handling filters, pagination, modals, and sorting in sync — required careful UI logic and testing.

## 🔧 What I'd Improve (If Given More Time)
### 📤 Export to Excel:
 #### Implement CSV/XLSX download for all employee records.

### 💬 Confirmation Prompts: 
#### Add sweet alerts or modal confirmations before deletes.




## 🙌 Author
### Sarvesh Baranwal
🔗 LinkedIn
💻 GitHub

## 📘 License
MIT — feel free to fork, remix, and improve!

