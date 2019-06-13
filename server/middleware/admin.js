let admin = (req, res, next) => {
  const { role } = req.user;
  switch (role) {
    case 0:
      return res.send('access denied');
  }
  next();
};

module.exports = { admin };
