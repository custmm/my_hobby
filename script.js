// DOM 요소
const selectModePage = document.getElementById("select-mode-page");
const galleryPage = document.getElementById("gallery-page");
const viewModeButton = document.getElementById("viewModeButton");
const uploadModeButton = document.getElementById("uploadModeButton");
const viewBackButton = document.getElementById("viewBackButton");
const uploadBackButton = document.getElementById("uploadBackButton");
const viewSection = document.getElementById("view-section");
const uploadSection = document.getElementById("upload-section");
const uploadForm = document.getElementById("uploadForm");


// 탭 및 콘텐츠 관련 DOM 요소
const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// 업로드 관련 DOM 요소
const fileInput = document.getElementById("fileInput");
const categorySelect = document.getElementById("categorySelect");
const subcategorySelect = document.getElementById("subcategorySelect");

const descriptionInput = document.getElementById("descriptionInput");
const imageListElements = document.querySelectorAll('.image-list');
const backToGalleryBtn = document.getElementById("backToGallery");
const imageViewer = document.getElementById("image-viewer");
const selectedImage = document.getElementById("selectedImage");
const selectedDescription = document.getElementById("selectedDescription");

// 서브카테고리 데이터
const subcategories = {
    puzzle: ["300조각", "500조각", "1000조각"],
    bizz: ["보석비즈"],
    solidbodypuzzle: ["나무퍼즐", "우드락퍼즐", "크리스탈퍼즐"],
    block: ["디폼블럭", "활용부분"]
};

// 첫 페이지 버튼 클릭 이벤트
viewModeButton.addEventListener("click", () => {
    selectModePage.style.display = "none";
    galleryPage.style.display = "block";
    viewSection.style.display = "block";
    uploadSection.style.display = "none";
});

uploadModeButton.addEventListener("click", () => {
    selectModePage.style.display = "none";
    galleryPage.style.display = "block";
    uploadSection.style.display = "block";
    viewSection.style.display = "none";
});

// 감상 모드 뒤로 가기 버튼 이벤트
viewBackButton.addEventListener("click", () => {
    galleryPage.style.display = "none";
    selectModePage.style.display = "flex";
    viewSection.style.display = "none";
});

// 업로드 모드 뒤로 가기 버튼 이벤트
uploadBackButton.addEventListener("click", () => {
    galleryPage.style.display = "none";
    selectModePage.style.display = "flex";
    uploadSection.style.display = "none";
});

// 탭 클릭 이벤트
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        tabContents.forEach(content => {
            content.classList.remove("active");
            if (content.id === `${tab.dataset.category}-tab`) {
                content.classList.add("active");
            }
        });
    });
});

// 업로드 시 서브카테고리 동적 변경
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    updateSubcategories(subcategorySelect, selectedCategory);
});

// 서브카테고리 옵션 업데이트
function updateSubcategories(selectElement, category) {
    selectElement.innerHTML = '<option value="" disabled selected>세부카테고리선택</option>';
    if (subcategories[category]) {
        subcategories[category].forEach(subcategory => {
            const option = document.createElement("option");
            option.value = subcategory.toLowerCase();
            option.textContent = subcategory;
            selectElement.appendChild(option);
        });
    }
}

// 이미지 업로드 처리
uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const category = categorySelect.value;
    const subcategory = subcategorySelect.value;
    const description = descriptionInput.value;

    if (file && category && subcategory && description) {
        const reader = new FileReader();
        reader.onload = () => {
            const imageItem = document.createElement("div");
            imageItem.className = "image-item";
            imageItem.innerHTML = `
                <img src="${reader.result}" alt="${file.name}" />
                <p>${subcategory}</p>
            `;

            // 이미지 클릭 시 미리보기 화면으로 이동
            imageItem.querySelector("img").addEventListener("click", () => {
                selectedImage.src = reader.result;
                selectedDescription.textContent = description;
                imageViewer.style.display = "block";
                document.querySelector("main").style.display = "none";
            });

            // 해당 카테고리의 이미지 목록에 추가
            document.querySelector(`#${category}-tab .image-list`).appendChild(imageItem);
        };
        reader.readAsDataURL(file);
    }
});

// 뒤로가기 버튼 클릭 시 갤러리로 돌아가기
backToGalleryBtn.addEventListener("click", () => {
    imageViewer.style.display = "none";
    document.querySelector("main").style.display = "block";
});
