// show max 20 result
const loadMobile = ()=> {
    const searchKey = document.getElementById("search-key").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchKey}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data));
}
const showResult = result => {
    if(result.data.length != 0) {
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        // loop
        let c = 0;
        result.data.forEach(element => {
            if(c < 20){
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="border grid grid-cols-4 p-2 break-words">
                    <div class="col-span-1">
                        <img src="${element.image}" alt="">
                    </div>
                    <div class="text-left col-span-3 ml-3">
                        <h2 class="p-2 border lg:mt-6">Phone name: ${element.phone_name}</h2>
                        <h2 class="p-2 border">Brand: ${element.brand}</h2>
                        <h2 class="p-2 border">Slug: <span id="phone-slug">${element.slug}</span></h2>
                        <button class="flex justify-end mt-4 bg-zinc-300 px-6 py-2 mx-4 rounded-md hover:bg-blue-300" onclick="viewDetails('${element.slug}')">Details</button>
                    </div>
                </div>
                `;
                resultField.appendChild(div);
                c++;
            }
        });
    }
    else{
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<h2 class="text-4xl">No result found</h2>`
        resultField.appendChild(div);
    }
}

// show all result
const loadAllMobile = ()=> {
    const searchKey = document.getElementById("search-key").value;
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchKey}`
    if(searchKey == ''){
        url = `https://openapi.programming-hero.com/api/phones?search=m`
    }
    fetch(url)
        .then(res => res.json())
        .then(data => showAllResult(data));
}
const showAllResult = result => {
    if(result.data.length != 0) {
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        // loop
        result.data.forEach(element => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="border grid grid-cols-4 p-2 break-words">
                <div class="col-span-1">
                    <img src="${element.image}" alt="">
                </div>
                <div class="text-left col-span-3 ml-3">
                    <h2 class="p-2 border lg:mt-6">Phone name: ${element.phone_name}</h2>
                    <h2 class="p-2 border">Brand: ${element.brand}</h2>
                    <h2 class="p-2 border">Slug: <span id="phone-slug">${element.slug}</span></h2>
                    <button class="flex justify-end mt-4 bg-zinc-300 px-6 py-2 mx-4 rounded-md hover:bg-blue-300" onclick="viewDetails('${element.slug}')">Details</button>
                </div>
            </div>
            `;
            resultField.appendChild(div);
        });
    }
    else{
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<h2 class="text-4xl">No result found</h2>`
        resultField.appendChild(div);
    }
}

// specification
const viewDetails = details =>{
    const slugUrl = `https://openapi.programming-hero.com/api/phone/${details}`
    fetch(slugUrl)
        .then(res => res.json())
        .then(data => openModal('modal',data.data));
}

function openModal(modalId,details) {
    // console.log(details)
    const specification = document.getElementById('specification');
    specification.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div id="modal" class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 break-words mx-4 h-full w-full">
        <div class="relative mx-auto shadow-lg rounded-md bg-white overflow-y-auto h-4/6 lg:w-4/6 w-5/6 lg:mt-12 mt-8">

            <!-- Modal header -->
            <div class="bg-lime-300 text-black text-center text-2xl rounded-t-md px-4 py-2 grid justify-center">
                <h3>${details.name}</h3>
                <img src="${details.image}" alt="">
            </div>

            <!-- Modal body -->
            <div class="overflow-y-scroll p-4">
                <div class="grid grid-cols-2">
                    <p class="border p-2">ReleaseDate</p>
                    <p class="border p-2">${details.releaseDate}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="border p-2">Storage</p>
                    <p class="border p-2">${details.mainFeatures.storage}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="border p-2">DisplaySize</p>
                    <p class="border p-2">${details.mainFeatures.displaySize}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="border p-2">ChipSet</p>
                    <p class="border p-2">${details.mainFeatures.chipSet}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="border p-2">Memory</p>
                    <p class="border p-2">${details.mainFeatures.memory}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="border p-2">Sensors</p>
                    <p class="border p-2">${details.mainFeatures.sensors}</p>
                </div>
                
            </div>

            <!-- Modal footer -->
            <div class="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onclick="closeModal()">Close</button>
            </div>
        </div>
    </div>
    `;
    specification.appendChild(div);
    modal = document.getElementById(modalId)
    modal.classList.remove('hidden')
    
}


function closeModal() {
    modal = document.getElementById('modal')
    modal.classList.add('hidden')
}

// show 20 random item
const loadRandom = ()=> {
    const url = `https://openapi.programming-hero.com/api/phones?search=m`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data));
}
const showRandom = result => {
    if(result.data.length != 0) {
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        // loop
        let c = 0;
        result.data.forEach(element => {
            if(c < 20){
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="border grid grid-cols-4 p-2 break-words">
                    <div class="col-span-1">
                        <img src="${element.image}" alt="">
                    </div>
                    <div class="text-left col-span-3 ml-3">
                        <h2 class="p-2 border lg:mt-6">Phone name: ${element.phone_name}</h2>
                        <h2 class="p-2 border">Brand: ${element.brand}</h2>
                        <h2 class="p-2 border">Slug: <span id="phone-slug">${element.slug}</span></h2>
                        <button class="flex justify-end mt-4 bg-zinc-300 px-6 py-2 mx-4 rounded-md hover:bg-blue-300" onclick="viewDetails('${element.slug}')">Details</button>
                    </div>
                </div>
                `;
                resultField.appendChild(div);
                c++;
            }
        });
    }
    else{
        const resultField = document.getElementById("search-result");
        resultField.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<h2 class="text-4xl">No result found</h2>`
        resultField.appendChild(div);
    }
}
loadRandom();