function checkRole(role) {
    return (req, res, next) => {
      if (req.decodedToken && req.decodedToken.role === role) {
        next();
      } else {
        res.status(401).json({
          error:
            "Admin access only. You do not have permission to view this page."
        });
      }
    };
  }

  module.exports = {
    checkRole
  }