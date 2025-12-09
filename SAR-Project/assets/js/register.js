const registerForm = document.getElementById('register-form');

const showError = (input, message) => {
  const field = input.closest('.field');
  const errorEl = field?.querySelector('.error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
  input.classList.add('invalid');
};

const clearError = input => {
  const field = input.closest('.field');
  const errorEl = field?.querySelector('.error');
  if (errorEl) errorEl.style.display = 'none';
  input.classList.remove('invalid');
};

const validators = {
  name: value => value.trim().length >= 3,
  studentId: value => /^\\d{7,10}$/.test(value.trim()),
  email: value => /^[\\w-.]+@\\w+\\.\\w{2,}$/.test(value.trim()),
  password: value => value.length >= 6,
};

if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const { name, studentId, email, password, college, activity } = registerForm.elements;

    clearError(name);
    clearError(studentId);
    clearError(email);
    clearError(password);

    if (!validators.name(name.value)) {
      showError(name, 'Please enter at least 3 characters.');
      valid = false;
    }
    if (!validators.studentId(studentId.value)) {
      showError(studentId, 'Student ID should be 7-10 digits.');
      valid = false;
    }
    if (!validators.email(email.value)) {
      showError(email, 'Enter a valid email address.');
      valid = false;
    }
    if (!validators.password(password.value)) {
      showError(password, 'Password should be 6+ characters.');
      valid = false;
    }

    if (valid) {
      const body = `
        <p><strong>Registration complete</strong></p>
        <p style="color:#c2c2c2;">Welcome ${name.value}. You selected ${activity.value} under ${college.value}.</p>
      `;
      window.SAR?.showModal({ title: 'Registered', body });
      registerForm.reset();
    }
  });

  registerForm.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
}

