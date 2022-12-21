const imageBox = document.getElementById("image_box");
const modalContainer = document.getElementById("modal-container");
const inputField = document.querySelector("#input_field");
const profileContainer = document.querySelector("#profile-container");
const profile = document.querySelector("#profile");
const cropBtn = document.querySelector("#crop-btn");
const modifiedProfile = document.querySelector("#modified-profile");
const maskBtn = document.querySelector("#mask-btn");
const hardMask = document.querySelector("#hardMask");
const squireMask = document.querySelector("#squireMask");
const circleMask = document.querySelector("#circleMask");
const areaMask = document.querySelector("#areaMask");
const maskDone = document.querySelector("#mask-done");

const getInput = () => {
    inputField.click();
};

inputField.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        modalContainer.style.display = "flex";
        const url = window.URL.createObjectURL(new Blob([file], { type: "image/jpg" }));
        profile.src = url;
        imageBox.classList.add("active");

        // Crop image
        options = {
            aspectRatio: 1,
            viewMode: 1,
            responsive: true,
        };
        const cropper = new Cropper(profile, options);
        cropBtn.addEventListener("click", () => {
            profileContainer.style.display = "none";
            cropBtn.style.display = "none";
            maskBtn.style.display = "grid";
            maskDone.style.display = "block";
            const url = cropper.getCroppedCanvas().toDataURL("image/jpeg");
            modifiedProfile.innerHTML = `<img id="cropped_profile" src="${url}" alt="" />`;
        });

        // Mask Image
        hardMask.addEventListener("click", () => {
            if (modifiedProfile.classList) {
                modifiedProfile.classList = [];
            }
            modifiedProfile.classList.add("hardMask");
        });
        squireMask.addEventListener("click", () => {
            if (modifiedProfile.classList) {
                modifiedProfile.classList = [];
            }
            modifiedProfile.classList.add("squireMask");
        });
        circleMask.addEventListener("click", () => {
            if (modifiedProfile.classList) {
                modifiedProfile.classList = [];
            }
            modifiedProfile.classList.add("circleMask");
        });
        areaMask.addEventListener("click", () => {
            if (modifiedProfile.classList) {
                modifiedProfile.classList = [];
            }
            modifiedProfile.classList.add("areaMask");
        });

        maskDone.addEventListener("click", () => {
            modalContainer.style.display = "none";
            document.getElementById("is_noimage").style.display = "none";
            imageBox.appendChild(modifiedProfile);
        });
    }
});

window.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
        profile.src = "";
        modalContainer.style.display = "none";
    }
});
