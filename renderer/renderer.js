const scanBtn =
    document.getElementById("scanBtn");

const fileList =
    document.getElementById("fileList");

let stlFiles = [];
let currentIndex = -1;

scanBtn.addEventListener("click", async () => {
    const folder =
        await window.electronAPI.selectFolder();
    if(!folder){
        return;
    }

console.log("Selected folder:", folder);

const files =
    await window.electronAPI.scanLibrary(folder);
    console.log("Files found:", files);
    stlFiles = files;
    fileList.innerHTML = "";
    files.forEach((file, index) => {
        const div =
            document.createElement("div");
        div.className = "fileItem";
        div.textContent = 
            file.split("\\").pop();
        div.addEventListener("click", () => {
            currentIndex = index;
            document
                .querySelectorAll(".fileItem")
                .forEach(item => {
                    item.classList.remove("selected");
                });
            div.classList.add("selected");
            console.log(
                "Selected:",
                file
            );
        });
        fileList.appendChild(div);
    });
});