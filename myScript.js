document.addEventListener("DOMContentLoaded", () => {
    const coverImage = document.getElementById("coverImage");
    const body = document.body;
    
    // --- [1. 메인 페이지] ---
    if (window.scrollY > 10) { 
        coverImage.classList.add("active"); 
        body.classList.add("scroll-active"); 
        console.log("스크롤이 내려가 있어 애니메이션을 건너뜁니다.");
    } else {
        setTimeout(() => {
            coverImage.classList.add("active");
        }, 1000);

        setTimeout(() => {
            body.classList.add("scroll-active");
        }, 3000);
    }

    const pickImgs = document.querySelectorAll(".pick-img");
    const closeBtns = document.querySelectorAll(".close-btn");
    const topBtn = document.getElementById("topBtn");
    const modals = document.querySelectorAll(".modal"); 
    
    let activeModal = null; 

    // --- [3. TOP 버튼] ---
    function checkScrollPosition() {
        let currentScrollY = 0;
        
        if (activeModal) {
            currentScrollY = activeModal.scrollTop;
        } else {
            currentScrollY = window.scrollY;
        }

        if (currentScrollY > window.innerHeight / 2) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    }

    // 4-1. 메인 화면 스크롤
    window.addEventListener("scroll", checkScrollPosition);

    // 4-2. 각 모달창 내부 스크롤
    modals.forEach(modal => {
        modal.addEventListener("scroll", checkScrollPosition);
    });

    topBtn.addEventListener("click", () => {
        if (activeModal) {
            activeModal.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // --- [5. 팝업 열기/닫기] ---

    // 팝업 열기
    pickImgs.forEach(img => {
        img.addEventListener("click", () => {
            const targetId = img.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                
                targetModal.style.display = "flex"; 
                document.body.classList.add("no-scroll");
                targetModal.scrollTop = 0; 
                
                activeModal = targetModal;
                checkScrollPosition();

                if (scrollbarWidth > 0) {
                    topBtn.style.marginRight = `${scrollbarWidth}px`;
                }
            }
        });
    });

    function closeModal(modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
        
        activeModal = null;
        checkScrollPosition();

        topBtn.style.marginRight = "0px";
    }

    // X 버튼으로 닫기
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            if (modal) {
                closeModal(modal);
            }
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            closeModal(e.target);
        }
    });
});

// 생존배낭 구성품 이미지 호버
const gridImages = document.querySelectorAll('.grid-item img');

gridImages.forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    if (hoverSrc) {
        img.addEventListener('mouseover', () => {
            img.src = hoverSrc; 
        });
        img.addEventListener('mouseout', () => {
            img.src = originalSrc; 
        });
    }
});

// =========================================
// [아이템 호버]
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const img = item.querySelector('img');
        

        if (!img) return;


        const originalSrc = img.src;

        const hoverSrc = img.getAttribute('data-hover');

 
        item.addEventListener('mouseenter', () => {
            
            if (hoverSrc) {
                img.src = hoverSrc;
            }

            const title = img.getAttribute('data-title');
            const desc = img.getAttribute('data-desc');
            const popupImageSrc = img.getAttribute('data-popup-img') || hoverSrc || originalSrc;

            if (title && desc) {
                const container = item.closest('.grid-container, .grid-container2');
                if (container) {
                    const popupWrapper = container.querySelector('.overlay-wrapper');
                    
                    if (popupWrapper) {
                        const popupImg = popupWrapper.querySelector('.popup-image-box img');
                        const popupTitle = popupWrapper.querySelector('.popup-title');
                        const popupDesc = popupWrapper.querySelector('.popup-desc');

                        if(popupImg) popupImg.src = popupImageSrc;
                        if(popupTitle) popupTitle.textContent = title;
                        if(popupDesc) popupDesc.innerHTML = desc.replace(/\n/g, "<br>");

                        popupWrapper.classList.add('active');
                    }
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            

            if (hoverSrc) {
                img.src = originalSrc;
            }

            const container = item.closest('.grid-container, .grid-container2');
            if (container) {
                const popupWrapper = container.querySelector('.overlay-wrapper');
                if (popupWrapper) {
                    popupWrapper.classList.remove('active');
                }
            }
        });
    });

    //팝업 카드 내 X 버튼
    const popupCloseBtns = document.querySelectorAll('.popup-close-btn');

    popupCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 

            const wrapper = btn.closest('.overlay-wrapper');
            if (wrapper) {
                wrapper.classList.remove('active');
            }
        });
    });

}); 
