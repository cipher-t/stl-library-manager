const scanBtn =
    document.getElementById("scanBtn");

const fileList =
    document.getElementById("fileList");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

let stlFiles = [];
let currentIndex = -1;
let rootFolder = "";

async function selectFile(index){

    if(index < 0 ||
        index >= stlFiles.length){
            return;
    }

    currentIndex = index;

    document
        .querySelectorAll(".fileItem")
        .forEach(item => {

            item.classList.remove(
                "selected"
            );

            if(
                Number(
                    item.dataset.index
                ) === index
            ){

                item.classList.add(
                    "selected"
                );

                item.scrollIntoView({
                    block: "nearest"
                });
            
            }
            
        });

    console.log(
        "Selected:",
        stlFiles[index]
    );

    const buffer =
        await window.electronAPI
            .readSTLFile(
                stlFiles[index]
            );

    const arrayBuffer =
            buffer.buffer.slice(
                buffer.byteOffset,
                buffer.byteOffset +
                buffer.byteLength
            );

    window.loadSTLBuffer(
        arrayBuffer
    );

}

scanBtn.addEventListener("click", async () => {
    const folder =
        await window.electronAPI.selectFolder();
    
    if(!folder){
        return;
    }
    
    rootFolder = folder;

    console.log(
        "Selected folder:",
        folder
    );
    
    const files =
        await window.electronAPI.scanLibrary(folder);
    
        console.log(
            "Files found:",
            files
        );
    
    stlFiles = files;
    
    const groups = {};

    fileList.innerHTML = "";
    
    files.forEach((file, index) => {
        
        const relativePath =
            file.replace(
                rootFolder + "\\",
                ""
            );
        
        const folderName =
            relativePath.includes("\\")
                ? relativePath.split("\\")[0]
                : "Root";

        if(!groups[folderName]){
            groups[folderName] = [];
        }

        groups[folderName].push({
            file,
            index
        });
        
    });

    for(const folderName in groups){
        const header =
            document.createElement("div");

        header.className =
            "folderHeader";

        header.textContent =
            "📁 " + folderName;

        fileList.appendChild(header);

        groups[folderName].forEach(item => {

            const div =
                document.createElement("div");

            div.className =
                "fileItem";

            div.dataset.index =
                item.index;

            div.textContent =
                item.file
                    .split("\\")
                    .pop();

            div.addEventListener(
                "click",
                () => {
                    selectFile(item.index);
                }
            );

            fileList.appendChild(div);

        });

    }

    if(stlFiles.length > 0){
        selectFile(0);
    }
});

prevBtn.addEventListener("click", () => {
    if(currentIndex > 0){
        selectFile(
            currentIndex - 1
        );
    }
});

nextBtn.addEventListener("click", () => {
    if(currentIndex <
        stlFiles.length - 1){
        selectFile(
            currentIndex + 1
        );
    }
});

document.addEventListener(
    "keydown",
    e => {
        if(
            e.key === "ArrowUp" &&
            currentIndex > 0
        ){
            selectFile(
                currentIndex - 1
            );
        }
        if(
            e.key === "ArrowDown" &&
            currentIndex <
            stlFiles.length - 1
        ){
            selectFile(
                currentIndex + 1
            );
        }
    }
);