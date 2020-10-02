export const validateEmail = email => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,99}$/i.test(email)) return false;
  return true;
};

export const validatePhone = phone => {
  if (!/(\+61|0)4\d{8}$/g.test(phone)) return false;
  return true;
};

export const validateStaffID = staff_id => {
  const num = parseInt(staff_id);
  if (num == null) return false;
  if (num < 10000 || num > 20000) return false;
  return true;
};
