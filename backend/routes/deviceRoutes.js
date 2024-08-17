const express = require('express');
const {
  createDevice,
  deleteDevice,
  getDevice,
  listDevices,
} = require('../controllers/deviceController');

const router = express.Router();

router.post('/', createDevice);
router.delete('/:deviceUid', deleteDevice);
router.get('/:deviceUid', getDevice);
router.get('/', listDevices);

module.exports = router;
