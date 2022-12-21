const wrapper = document.querySelector(".wrapper");
const modalContainer = document.getElementById("modal-container");
const inputField = document.querySelector("#input_field");
const cancelBtn = document.querySelector("#cancel-btn i");
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
        wrapper.classList.add("active");

        // Crop image
        options = {
            aspectRatio: 0,
            viewMode: 0,
        };

        const cropper = new Cropper(profile, options);
        cropBtn.addEventListener("click", () => {
            profileContainer.style.display = "none";
            cropBtn.style.display = "none";
            maskBtn.style.display = "flex";
            const url = cropper.getCroppedCanvas().toDataURL("image/jpeg");
            modifiedProfile.innerHTML = `<img id="cropped_profile" src="${url}" alt="" />`;
        });

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
            document.querySelector("#content").classList.add("hidden");
            wrapper.appendChild(modifiedProfile);
        });
    }
});

window.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
        modalContainer.style.display = "none";
    }
});
