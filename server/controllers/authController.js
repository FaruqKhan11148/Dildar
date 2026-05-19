const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.adminLogin = async (req, res) => {
  console.log('🔥 LOGIN HIT');

  console.log('BODY:', req.body);

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    console.log('ADMIN FOUND:', admin);

    if (!admin) {
      console.log('❌ No admin found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('DB PASSWORD:', admin.password);
    console.log('INPUT PASSWORD:', password);

    if (admin.password !== password) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ LOGIN SUCCESS');

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    res.json({ token });
  } catch (err) {
    console.log('💥 ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
