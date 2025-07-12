<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
  <header>
    <h1>👨‍💼 Employee Directory</h1>
    <div class="actions">
      <input type="text" id="search" placeholder="Search by name/email..." />
      <select id="sortBy">
        <option value="default">Sort By</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
      </select>
      <select id="items-per-page">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
        <option value="25">25 per page</option>
        <option value="1000">All</option>
      </select>
      <button id="filter-toggle">🔍 Filter</button>
      <button id="theme-toggle">🌗 Toggle Theme</button>
      <button id="add-btn">+ Add Employee</button>
    </div>
  </header>

  <!-- Filter Sidebar -->
  <aside id="filter-sidebar" class="filter-sidebar hidden">
    <div class="filter-header">
      <h3>Filter Employees</h3>
      <button id="close-filter">✖</button>
    </div>
    <input type="text" id="filter-first" placeholder="First Name" />
    <input type="text" id="filter-dept" placeholder="Department" />
    <input type="text" id="filter-role" placeholder="Role" />
    <div class="form-buttons">
      <button id="reset-filter">Reset</button>
    </div>
  </aside>

  <main>
    <div id="employee-list-container" class="grid-container">
      <#list employees as employee>
        <div class="employee-card" data-id="${employee.id}">
          <h3>${employee.firstName} ${employee.lastName}</h3>
          <p>Email: ${employee.email}</p>
          <p>Department: ${employee.department}</p>
          <p>Role: ${employee.role}</p>
          <button class="edit-btn" data-id="${employee.id}">Edit</button>
          <button class="delete-btn" data-id="${employee.id}">Delete</button>
        </div>
      </#list>
    </div>
    <div id="pagination"></div>
  </main>

  <!-- Modal Form -->
  <div id="formModal" class="modal hidden">
    <form id="employee-form">
      <h2 id="formTitle">Add Employee</h2>
      <input type="hidden" id="employee-id" />
      <input type="text" id="first-name" placeholder="First Name" required />
      <input type="text" id="last-name" placeholder="Last Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="text" id="department" placeholder="Department" required />
      <input type="text" id="role" placeholder="Role" required />
      <div class="form-buttons">
        <button type="submit">Save</button>
        <button type="button" id="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>

  <!-- Toast -->
  <div id="toast" class="toast hidden"></div>

  <!-- Footer -->
  <footer>
    <p>&copy; 2025 Sarvesh's Employee Directory. All rights reserved.</p>
  </footer>

  <script src="/static/js/app.js"></script>
</body>
</html>
