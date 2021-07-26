urlDogList = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    fetchList();
})

function fetchList(){
    fetch(urlDogList)
        .then(resp => resp.json())
        .then(data => resetPage(data))
}

function resetPage(data){
    let table = document.querySelector('#table-body');
    table.innerHTML = '';

    data.forEach(element => renderElement(element))
}

function resetPage2(element){
    let table = document.querySelector('#table-body');
    table.innerHTML = '';

    renderElement(element)
}

function renderElement(element){
    let table = document.querySelector('#table-body');
    let form = document.querySelector('#dog-form');

    

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerText = element.name
    let td2 = document.createElement('td');
    td2.innerText = element.breed
    let td3 = document.createElement('td');
    td3.innerText = element.sex
    let btn = document.createElement('button');
    btn.innerText = 'Edit Dog'
    btn.addEventListener('click',  (e) => {
        console.log(element);
        let input1 = form.name
        input1.value = element.name
        let input2 = form.breed

        input2.value = element.breed
        let input3 = form.sex
        input3.value = element.sex

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            fetch(`${urlDogList}/${element.id}`,{
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id : element.id,
                    name : input1.value,
                    breed : input2.value,
                    sex : input3.value
                })
            })
            .then(resp => resp.json())
            .then(data => refreshPage(data))
        })  
    })
    tr.append(td1, td2, td3, btn);
    table.appendChild(tr);
}

function refreshPage(data){
    console.log(data);
    fetch(urlDogList)
        .then(resp => resp.json())
        .then(data => {
            let table = document.querySelector('#table-body');
            table.innerHTML = '';

            data.forEach(element => {renderElement(element)})
        })
    }

