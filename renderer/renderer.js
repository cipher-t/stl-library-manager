const scanBtn =
    document.getElementById("scanBtn");

const fileList =
    document.getElementById("fileList");

scanBtn.addEventListener("click", async () => {
    const folder =
        await window.electronAPI.selectFolder();
    if(!folder){
        return;
    }
//    const files =
//        await window.electronAPI.scanLibrary(folder);
console.log("Selected folder:", folder);
const files =
    await window.electronAPI.scanLibrary(folder);
console.log("Files found:", files);

    fileList.innerHTML = "";
    files.forEach(file => {
        const div =
            document.createElement("div");
        div.textContent = file;
        fileList.appendChild(div);
    });
});