/**
 * PSM | 1 Day 1 New Behaviour
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const spotModal = document.getElementById('spotModal');
    const ketahuanModal = document.getElementById('ketahuanModal');
    const toast = document.getElementById('toast');
    const earlyLeavePass = document.getElementById('earlyLeavePass');

    // Buttons
    const btnOpenSpotModal = document.getElementById('btnOpenSpotModal');
    const btnCloseSpot = document.getElementById('btnCloseSpot');
    const btnBackSpot = document.getElementById('btnBackSpot');
    const btnKirimSpot = document.getElementById('btnKirimSpot');
    const btnCloseKetahuan = document.getElementById('btnCloseKetahuan');
    const btnBackKetahuan = document.getElementById('btnBackKetahuan');
    const btnOkSpot = document.getElementById('btnOkSpot');
    const btnClosePass = document.getElementById('btnClosePass');
    const btnPrint = document.getElementById('btnPrint');

    // --- Modal Management ---
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open Spot Modal
    btnOpenSpotModal.addEventListener('click', () => {
        openModal(spotModal);
    });

    // Close Spot Modal
    btnCloseSpot.addEventListener('click', () => closeModal(spotModal));
    btnBackSpot.addEventListener('click', () => closeModal(spotModal));

    // Close Ketahuan Modal
    btnCloseKetahuan.addEventListener('click', () => closeModal(ketahuanModal));
    btnBackKetahuan.addEventListener('click', () => closeModal(ketahuanModal));

    // Close modal on overlay click
    [spotModal, ketahuanModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(spotModal);
            closeModal(ketahuanModal);
        }
    });

    // --- Submit Spot ---
    btnKirimSpot.addEventListener('click', () => {
        const teman = document.getElementById('selectTeman').value;
        const jenis = document.getElementById('selectJenis');
        const catatan = document.getElementById('inputCatatan').value;
        const jenisText = jenis.options[jenis.selectedIndex].text;

        // Close spot modal
        closeModal(spotModal);

        // Show toast
        showToast(`Spot untuk ${capitalizeFirst(teman)} berhasil dikirim!`);

        // After a short delay, show ketahuan modal
        setTimeout(() => {
            // Update ketahuan modal content dynamically
            const detailStrong = ketahuanModal.querySelector('.ketahuan-detail strong');
            const infoP = ketahuanModal.querySelector('.ketahuan-info p');
            const headerH3 = ketahuanModal.querySelector('.modal-header h3');

            headerH3.textContent = `${capitalizeFirst(teman)} Ketahuan!`;
            detailStrong.textContent = jenisText;
            infoP.textContent = catatan || 'Tidak ada catatan';

            openModal(ketahuanModal);
        }, 1500);
    });

    // --- OK Spot ---
    btnOkSpot.addEventListener('click', () => {
        closeModal(ketahuanModal);
        showToast('Poin +1 berhasil ditambahkan! 🎉');
        updateScore();
    });

    // --- Toast ---
    function showToast(message) {
        const toastText = toast.querySelector('.toast-text');
        toastText.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // --- Score Update (animation) ---
    let currentScore = 2;
    function updateScore() {
        currentScore++;
        const scoreEl = document.querySelector('.score-value.blue');
        scoreEl.textContent = `+${currentScore}`;

        // Animate score bump
        scoreEl.style.transform = 'scale(1.3)';
        scoreEl.style.transition = 'transform 0.2s';
        setTimeout(() => {
            scoreEl.style.transform = 'scale(1)';
        }, 200);
    }

    // --- Early Leave Pass ---
    btnClosePass.addEventListener('click', () => {
        earlyLeavePass.classList.add('closed');
        setTimeout(() => {
            earlyLeavePass.style.display = 'none';
        }, 300);
    });

    btnPrint.addEventListener('click', () => {
        showToast('🖨️ Mencetak Early Leave Pass...');
    });

    // --- Progress bar animation on scroll ---
    const progressFill = document.querySelector('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFill.style.width = '80%';
            }
        });
    }, { threshold: 0.5 });

    if (progressFill) {
        observer.observe(progressFill.parentElement);
    }

    // --- Checklist item click effect ---
    document.querySelectorAll('.check-item').forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(1.1)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // --- Game task hover ripple ---
    document.querySelectorAll('.game-task').forEach(task => {
        task.addEventListener('click', () => {
            task.style.background = '#dcfce7';
            setTimeout(() => {
                task.style.background = '#f0fdf4';
            }, 300);
        });
    });

    // --- Leaderboard item click ---
    document.querySelectorAll('.leaderboard-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('.player-name').textContent;
            const score = item.querySelector('.player-score').textContent;
            showToast(`${name}: Skor ${score}`);
        });
    });

    // --- Achievement badge click ---
    document.querySelectorAll('.achievement-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const label = badge.querySelector('.badge-label strong').textContent;
            showToast(`🏆 ${label}`);
        });
    });

    // --- Staggered animation for elements ---
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[class*="fadeInUp"]').forEach(el => {
        animateOnScroll.observe(el);
    });

    // --- Utility ---
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // --- Auto-show ketahuan after 5 seconds for demo ---
    // (uncomment to enable)
    // setTimeout(() => openModal(ketahuanModal), 5000);
});
