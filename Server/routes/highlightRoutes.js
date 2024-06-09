const express = require('express');
const router = express.Router();

const {auth} = require('../middlewares/auth');
const { saveHighlight, getUrlHighlights, getUserHighlights, deleteHighlight } = require('../controllers/highlightController');

router.post('/saveHighlight', auth, saveHighlight);
router.get('/getUrlHighlights', auth, getUrlHighlights);
router.get('/getUserHighlights', auth, getUserHighlights);
router.delete('/deleteHighlight', deleteHighlight);

module.exports = router;