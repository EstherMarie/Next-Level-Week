function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) // é uma função anônima que está retornando um valor. A forma completa seria: .then((res) => {return res.json()})
    .then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } 
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //event = qual é o evento (Resposta: é o change (mudar)) / target = onde foi executado (Resposta: no select[name=uf]) / value = exibe o valor do target

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //Pode ser só ""
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json()) // é uma função anônima que está retornando um valor. A forma completa seria: .then((res) => {return res.json()})
    .then( cities => {
        
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]") //Procura o select que tem o name = uf
    .addEventListener("change", getCities) // não é getCities() pq não queremos executá-la imediatamente. Neste caso, a função getCities só será executada quando mudar, isto é, após o change.




/* Código já reproduzido. Mantido apenas por causa da explicação :P
document
    .querySelector("select[name=uf]") //Procura o select que tem o name = uf
    .addEventListener("change", () => {
        console.log("mudei")
    }) // () => {} é uma Arrow Function ou função anônima. Funciona da mesma forma que: function () {}
*/
 

// Itens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected") // O classList se refere a classe do elemento html. Ele pode ser add, remove ou toggle, que é ambos.

    const itemId = itemLi.dataset.id //era event.dataset . Essa já é a variável acima; 
    /* Após a criação do back-end, os ids dos itens foram alterados de numéricos para strings (nomes dos itens) */
    console.log('ITEM ID: ', itemId)
    
    //1 Verificar se existe itens selecionados
    //2 Caso sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item) {
        return itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //3 Se já estiver selecionado...
    if (alreadySelected >= 0) {
        //4 tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // retorna um false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else { //5 Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    //6 atualizar o campo escondido com os itens selecionados (isso tudo é um algoritmo :D)
    // aqui estava o const collectedItems = document.querySelector("input[name=items]") . Foi movido para cima para evitar que esse elemento fosse procurado a cada momento que a função fosse executada.
    collectedItems.value = selectedItems
}