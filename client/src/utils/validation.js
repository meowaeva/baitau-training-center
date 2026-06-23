const nameRegex = /^[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s'-]{2,60}$/;
const phoneRegex = /^[+0-9\s()-]{7,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLead = values => {
  const errors = {};

  const check = (field, value) => {
    if (field === 'name') {
      if (!value.trim()) return 'Full name is required.';
      if (!nameRegex.test(value.trim())) return 'Enter a valid name using letters only.';
    }

    if (field === 'phone') {
      if (!value.trim()) return 'Phone number is required.';
      if (!phoneRegex.test(value.trim())) return 'Enter a valid phone number, for example +7 777 123 45 67.';
    }

    if (field === 'email') {
      if (!value.trim()) return 'Email is required so your request can be linked to your account.';
      if (!emailRegex.test(value.trim())) return 'Enter a valid email address.';
    }

    if (field === 'company' && value.trim().length > 100) {
      return 'Company name must be no longer than 100 characters.';
    }

    if (field === 'service') {
      if (!value.trim()) return 'Course or service is required.';
      if (value.trim().length > 120) return 'Course name is too long.';
    }

    if (field === 'message' && value.trim().length > 500) {
      return 'Message must be no longer than 500 characters.';
    }

    return '';
  };

  Object.keys(values).forEach(key => {
    const error = check(key, values[key] || '');
    if (error) errors[key] = error;
  });

  return errors;
};

export const validateAuth = (values, mode) => {
  const errors = {};

  if (mode === 'register') {
    if (!values.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (!nameRegex.test(values.name.trim())) {
      errors.name = 'Enter a valid name using letters only.';
    }
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (mode === 'register') {
    if (values.password.length < 8) errors.password = 'Password must contain at least 8 characters.';
    else if (!/[A-Z]/.test(values.password)) errors.password = 'Password must contain at least one uppercase letter.';
    else if (!/[0-9]/.test(values.password)) errors.password = 'Password must contain at least one number.';
  }

  return errors;
};
