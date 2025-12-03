// Data validation middleware
const validateStudent = (req, res, next) => {
  const { firstName, lastName, email, matricule } = req.body;

  if (!firstName || !lastName || !email || !matricule) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: firstName, lastName, email, matricule',
    });
  }

  next();
};

const validateCourse = (req, res, next) => {
  const { name, code, teacher } = req.body;

  if (!name || !code || !teacher) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, code, teacher',
    });
  }

  next();
};

const validateTeacher = (req, res, next) => {
  const { firstName, lastName, email, employeeId } = req.body;

  if (!firstName || !lastName || !email || !employeeId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: firstName, lastName, email, employeeId',
    });
  }

  next();
};

module.exports = {
  validateStudent,
  validateCourse,
  validateTeacher,
};
