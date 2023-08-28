const loadPhone = async (searchPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones)
}


const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    const buttonContainer = document.getElementById('show-all-phone');

    if (phones.length > 12) {
        buttonContainer.classList.remove('hidden');
    }
    else {
        buttonContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 12)
    // console.log(phones);

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-5 bg-grey-100 shadow-2xl mx-auto`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
            <h2 class="text-2xl font-medium ">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')"  class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    if(phones.length === 0){
        const matchedContainer = document.getElementById('not-matched');
        const alert = document.createElement('h2');
        alert.innerText = 'You search products is not matched at all!!';
        alert.style.textAlign = 'center';
        alert.style.color = 'red';
        alert.style.fontSize = '25px';
        alert.style.fontWeight = 'bold';

        matchedContainer.appendChild(alert)  
    }
    toggleLoadingSpinner(false);
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('search-input');
    const inputText = searchText.value;
    // console.log(inputText);
    loadPhone(inputText);
}

// toggle loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loading = document.getElementById('loading-spinner');
    if (isLoading) {
        loading.classList.remove('hidden');
    }
    else {
        loading.classList.add('hidden');
    }
}

// Show details information
const handleShowDetail = async (id) => {
    console.log('Show details clicked', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const phoneData = data.data;
    handleShowDetailsModal(phoneData);

}

const handleShowDetailsModal = (data) => {
    console.log(data);
    
    const phoneName = document.getElementById('phone-datails-name');
    phoneName.innerText = data.name;
    
    
    const phoneContainer = document.getElementById('phone-details-container');
    phoneContainer.innerHTML = `
    <div class="flex justify-center"><img src="${data.image}" alt="" /></div>
    <div class="">
        <p><span class="font-bold">Brand</span>: ${data.brand}</p>
        <p><span class="
        font-bold">Display size</span>: ${data.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Memory</span>: ${data.mainFeatures.memory}</p>
        <p><span class="font-bold">GPS</span>: ${data.others?.GPS ? data.others.GPS : "GPS not available in this devices."}</p>
    </div>
    `
    show_details_modal.showModal(data);
}