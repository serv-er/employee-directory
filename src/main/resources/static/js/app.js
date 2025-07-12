let employees = JSON.parse(localStorage.getItem('employees')) || [];

const listContainer = document.getElementById('employee-list-container');
const formModal = document.getElementById('formModal');
const form = document.getElementById('employee-form');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('search');
const empIdField = document.getElementById('employee-id');
const fName = document.getElementById('first-name');
const lName = document.getElementById('last-name');
const email = document.getElementById('email');
const dept = document.getElementById('department');
const role = document.getElementById('role');
const sortBy = document.getElementById('sortBy');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');
const filterToggle = document.getElementById('filter-toggle');
const filterSidebar = document.getElementById('filter-sidebar');
const filterFirst = document.getElementById('filter-first');
const filterDept = document.getElementById('filter-dept');
const filterRole = document.getElementById('filter-role');
const resetFilterBtn = document.getElementById('reset-filter');
const itemsPerPageSelector = document.getElementById('items-per-page');

let currentPage = 1;
let itemsPerPage = parseInt(itemsPerPageSelector?.value || 5);

// Load persisted theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Save employee list
function saveToLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Toast
function showToast(msg, color = '#333') {
  toast.textContent = msg;
  toast.style.backgroundColor = color;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

// Combined filters
function filteredEmployees(data = employees) {
  const query = searchInput.value.toLowerCase();
  return data.filter(emp => {
    const nameMatch = emp.firstName.toLowerCase().includes(query) || emp.lastName.toLowerCase().includes(query) || emp.email.toLowerCase().includes(query);
    const firstMatch = !filterFirst.value || emp.firstName.toLowerCase().includes(filterFirst.value.toLowerCase());
    const deptMatch = !filterDept.value || emp.department.toLowerCase().includes(filterDept.value.toLowerCase());
    const roleMatch = !filterRole.value || emp.role.toLowerCase().includes(filterRole.value.toLowerCase());
    return nameMatch && firstMatch && deptMatch && roleMatch;
  });
}

// Sorting
function sortEmployees(list) {
  const val = sortBy.value;
  return [...list].sort((a, b) => {
    if (val === 'firstName') return a.firstName.localeCompare(b.firstName);
    if (val === 'department') return a.department.localeCompare(b.department);
    return 0;
  });
}

// Render Employees
function renderEmployees() {
  listContainer.innerHTML = '';
  const filtered = sortEmployees(filteredEmployees());
  const start = (currentPage - 1) * itemsPerPage;
  const pageData = filtered.slice(start, start + itemsPerPage);

  if (filtered.length === 0) {
    listContainer.innerHTML = `<p style="text-align:center;width:100%">No matching records found.</p>`;
  }

  pageData.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.setAttribute('data-id', emp.id);
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    listContainer.appendChild(card);
  });

  renderPagination(filtered.length);
}

// Pagination
function renderPagination(totalItems) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'page-btn';
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    pagination.appendChild(btn);
  }
}

// Add Modal
document.getElementById('add-btn').addEventListener('click', () => {
  form.reset();
  empIdField.value = '';
  document.getElementById('formTitle').textContent = 'Add Employee';
  formModal.classList.remove('hidden');
  formModal.classList.add('show');
});

// Cancel Modal
document.getElementById('cancel-btn').addEventListener('click', () => {
  formModal.classList.remove('show');
  setTimeout(() => formModal.classList.add('hidden'), 300);
  form.reset();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Search
searchInput.addEventListener('input', () => {
  currentPage = 1;
  renderEmployees();
});

// Sort
sortBy.addEventListener('change', () => {
  currentPage = 1;
  renderEmployees();
});

// Items per page
if (itemsPerPageSelector) {
  itemsPerPageSelector.addEventListener('change', () => {
    itemsPerPage = parseInt(itemsPerPageSelector.value);
    currentPage = 1;
    renderEmployees();
  });
}

// Filter sidebar toggle
if (filterToggle && filterSidebar) {
  filterToggle.addEventListener('click', () => {
    filterSidebar.classList.toggle('show');
  });
}

// Reset Filters
if (resetFilterBtn) {
  resetFilterBtn.addEventListener('click', () => {
    filterFirst.value = '';
    filterDept.value = '';
    filterRole.value = '';
    currentPage = 1;
    renderEmployees();
  });
}

// Filter inputs
[filterFirst, filterDept, filterRole].forEach(input =>
  input?.addEventListener('input', () => {
    currentPage = 1;
    renderEmployees();
  })
);

// Form Submit
form.addEventListener('submit', e => {
  e.preventDefault();

  const id = empIdField.value;
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: fName.value.trim(),
    lastName: lName.value.trim(),
    email: email.value.trim(),
    department: dept.value.trim(),
    role: role.value.trim(),
  };

  if (id) {
    const index = employees.findIndex(emp => emp.id == id);
    if (index !== -1) {
      employees[index] = newEmp;
      showToast('Employee updated ✅', '#2e7d32');
    }
  } else {
    employees.push(newEmp);
    showToast('Employee added 🎉', '#0288d1');
  }

  saveToLocalStorage();
  formModal.classList.remove('show');
  setTimeout(() => formModal.classList.add('hidden'), 300);
  form.reset();
  renderEmployees();
});

// Edit / Delete
listContainer.addEventListener('click', e => {
  const card = e.target.closest('.employee-card');
  const id = card?.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('delete-btn')) {
    employees = employees.filter(emp => emp.id != id);
    saveToLocalStorage();
    renderEmployees();
    showToast('Deleted successfully ❌', '#c62828');
  }

  if (e.target.classList.contains('edit-btn')) {
    const emp = employees.find(emp => emp.id == id);
    if (!emp) return;

    empIdField.value = emp.id;
    fName.value = emp.firstName;
    lName.value = emp.lastName;
    email.value = emp.email;
    dept.value = emp.department;
    role.value = emp.role;

    document.getElementById('formTitle').textContent = 'Edit Employee';
    formModal.classList.remove('hidden');
    formModal.classList.add('show');
  }
});

// Close filter sidebar from "✖" button
const closeFilterBtn = document.getElementById('close-filter');

if (closeFilterBtn) {
  closeFilterBtn.addEventListener('click', () => {
    filterSidebar.classList.remove('show');
  });
}


// First render
renderEmployees();
