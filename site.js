const modal = document.querySelector('dialog');

function Abrir() {
    modal.style.display = 'flex';
}
document.getElementById('abrir').addEventListener('click', Abrir);

function Fechar() {
    modal.style.display = 'none';
}
document.getElementById('fechar').addEventListener('click', Fechar);
function listaVendas() {
    let cliente = document.getElementById('cliente').value;
    let produto = document.getElementById('produto').value;
    let codproduto = document.getElementById('codproduto').value;
    let valor = parseFloat(document.getElementById('valor').value);

    let venda = {
        cliente: cliente,
        produto: produto,
        codproduto: codproduto,
        valor: valor
    };

    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    vendas.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendas));

    adicionarVendaAoDOM(venda);
    atualizarSomaTotal();
    Fechar(); 
}

function adicionarVendaAoDOM(venda) {
    let div = document.createElement('div');
    let paragrafo = document.createElement('h3');
    let botaoExcluir = document.createElement('button');
    let botaoEditar = document.createElement('button');

    paragrafo.textContent = `Cliente: ${venda.cliente} Produto: ${venda.produto} Código do Produto: ${venda.codproduto} Valor do Produto: ${venda.valor.toFixed(2)}`;
    botaoExcluir.textContent = "Excluir";
    botaoEditar.textContent = "Editar";
    botaoExcluir.style.marginLeft = "10px";
    botaoEditar.style.marginLeft = "10px";

    botaoExcluir.addEventListener('click', function() {
        div.remove();
        excluirVendaDoLocalStorage(venda);
        atualizarSomaTotal();
    });

    botaoEditar.addEventListener('click', function() {
        editarVenda(venda, paragrafo);
    });

    div.appendChild(paragrafo);
    div.appendChild(botaoExcluir);
    div.appendChild(botaoEditar);
    document.body.appendChild(div);
}

function excluirVendaDoLocalStorage(venda) {
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    const index = vendas.findIndex(v => v.cliente === venda.cliente && v.produto === venda.produto && v.codproduto === venda.codproduto && v.valor === venda.valor);
    if (index !== -1) {
      vendas.splice(index, 1);
      localStorage.setItem('vendas', JSON.stringify(vendas));
    }
  }

// function excluirVendaDoLocalStorage(venda) {
//     let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
//     vendas = vendas.filter(v => v.cliente !== venda.cliente || v.produto !== venda.produto || v.codproduto !== venda.codproduto || v.valor !== venda.valor);
//     localStorage.setItem('vendas', JSON.stringify(vendas));
//     localStorage.removeItem()
// }

function atualizarSomaTotal() {
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    let somaTotal = vendas.reduce((soma, venda) => soma + venda.valor, 0);
    document.getElementById('somaTotal').textContent = `Soma Total dos Valores: ${somaTotal.toFixed(2)}`;
}

function editarVenda(venda, paragrafo) {
    let cliente = prompt("Editar Cliente:", venda.cliente);
    let produto = prompt("Editar Produto:", venda.produto);
    let codproduto = prompt("Editar Código do Produto:", venda.codproduto);
    let valor = parseFloat(prompt("Editar Valor do Produto:", venda.valor));

    if (cliente && produto && codproduto && !isNaN(valor)) {
        excluirVendaDoLocalStorage(venda);

        venda.cliente = cliente;
        venda.produto = produto;
        venda.codproduto = codproduto;
        venda.valor = valor;

        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        vendas.push(venda);
        localStorage.setItem('vendas', JSON.stringify(vendas));

        paragrafo.textContent = `Cliente: ${venda.cliente} Produto: ${venda.produto} Código do Produto: ${venda.codproduto} Valor do Produto: ${venda.valor.toFixed(2)}`;
        atualizarSomaTotal();
    }
}

document.getElementById('bt').addEventListener('click', listaVendas);

window.onload = function() {
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    vendas.forEach(venda => {
        adicionarVendaAoDOM(venda);
    });
    atualizarSomaTotal();
}
