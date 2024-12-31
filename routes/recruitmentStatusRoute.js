const express = require('express');
const router = express.Router();
const {
    getRecruitmentStatuses,
    createRecruitmentStatus,
    updateRecruitmentStatus,
    deleteRecruitmentStatus
} = require('../controllers/recruitmentStatusController');

router.get('/', getRecruitmentStatuses);
router.post('/', createRecruitmentStatus);
router.put('/:id', updateRecruitmentStatus);
router.delete('/:id', deleteRecruitmentStatus);

module.exports = router;
