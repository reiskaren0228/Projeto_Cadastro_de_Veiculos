import * as readline from 'readline-sync';

class Veiculo {
  tipo: string;
  modelo: string;
  ano: number;
  cores: string;
  preco: number;

  constructor(tipo: string, modelo: string, ano: number, cores: string, preco: number) {
    this.tipo = tipo;
    this.modelo = modelo;
    this.ano = ano;
    this.cores = cores;
    this.preco = preco;
  }

  exibir(): void {
    console.log("------------------------");
    console.log(`Tipo: ${this.tipo}`);
    console.log(`Modelo: ${this.modelo}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Cor: ${this.cores}`);
    console.log(`Preço: ${this.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })} `);
    console.log("------------------------");
  }
}

let veiculos: Veiculo[] = [
  // Carro
  new Veiculo("Carro", "Citroen c4", 2020, "Prata", 35000),
  new Veiculo("Carro", "Fusca", 1989, "Preto", 85000),
  new Veiculo("Carro", "Ferrari", 2023, "Vermelho", 35000000),

  // Moto
  new Veiculo("Moto", "Yamaha Fluo", 2022, "Branco", 25000),
  new Veiculo("Moto", "PCX", 2021, "Preta", 45000),
  new Veiculo("Moto", "Fazer", 2019, "Azul", 23000)
];

// Função que lista veículos de um tipo específico
function listarVeiculos(tipoModificado?: string, modificado?: any): void {
  console.log(`Listando veículos ${tipoModificado ? `do tipo "${tipoModificado}"` : ''}`);
  console.log("-------------------------------------------------\n");

  const veiculosFiltrados = tipoModificado ? veiculos.filter(v => v.tipo.toLowerCase() === tipoModificado.toLowerCase()) : veiculos;

  if (veiculosFiltrados.length > 0) {
    veiculosFiltrados.forEach(v => v.exibir());
  } else {
    console.log(`\n *** Nenhum veículo ${tipoModificado ? `do tipo "${tipoModificado}" ` : ''} foi encontrado. ***\n`);
  }
}

// Cadastro de Novos Veículos
function cadastrarNovoVeiculo(tipo: string): void {
  console.log(`\nCadastrar um novo veículo do tipo "${tipo}"`);
  console.log("---------------------------------------------");

  let modelo: string = readline.question("Modelo do veículo: ");
  let ano: number = readline.questionInt("Ano do veículo: ");
  let cores: string = readline.question("Cores disponíveis: ");
  let preco: number = parseFloat(readline.question("Preço do veículo: "));

  const novoVeiculo = new Veiculo(tipo, modelo, ano, cores, preco);
  veiculos.push(novoVeiculo);
  console.log("\n==============================================\n");
  console.log(`Veículo "${modelo.toUpperCase()}" cadastrado com sucesso!`);
  console.log("\n==============================================\n");
  console.log("Veículo cadastrado: ");
  novoVeiculo.exibir();
}

// Função para alterar as características dos veículos
function alterarVeiculo(): void {
  console.clear();
  console.log("Alterar um veículo");
  console.log("------------------");

  console.log("Escolha o tipo de veículo:");
  console.log("1 - Carro");
  console.log("2 - Moto");

  const tipoAlterar: number = readline.questionInt("Qual o tipo de veículo que você deseja alterar: ");
  if (tipoAlterar !== 1 && tipoAlterar !== 2) {
    console.log("\n*** Opção inválida. Por favor, escolha 1 para Carro ou 2 para Moto. ***\n");
    return;
  }

  const tipo: string = tipoAlterar === 1 ? 'Carro' : 'Moto';

  listarVeiculos(tipo);

  const modeloBusca: string = readline.question("Digite o modelo do veículo que deseja alterar: ");

  const veiculoParaAlterar: Veiculo | undefined = veiculos.find((veiculo) => {
    return veiculo.tipo.toLowerCase() === tipo.toLowerCase() &&
      veiculo.modelo.toLowerCase() === modeloBusca.toLowerCase();
  });

  if (veiculoParaAlterar) {
    console.log("Veículo encontrado:");
    veiculoParaAlterar.exibir();

    let continuarAlterando: boolean = true;

    while (continuarAlterando) {
      console.log("\n==============================================\n");
      console.log("Escolha o que deseja alterar:");
      console.log("1 - Modelo");
      console.log("2 - Ano");
      console.log("3 - Cor");
      console.log("4 - Preço");
      console.log("0 - Voltar ao menu inicial");
      console.log("9 - Mostrar veículos para alteração");

      const opcaoAlteracao: number = readline.questionInt("Escolha uma opção: ");
      console.log("==============================================\n");

      switch (opcaoAlteracao) {
        case 1:
          const novoModelo: string = readline.question("Digite o novo modelo: ");
          veiculoParaAlterar.modelo = novoModelo;
          console.log("==============================================\n");
          console.log("Modelo do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 2:
          const novoAno: number = readline.questionInt("Digite o novo ano: ");
          veiculoParaAlterar.ano = novoAno;
          console.log("==============================================\n");
          console.log("Ano do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 3:
          const novasCores: string = readline.question("Digite a nova cor: ");
          veiculoParaAlterar.cores = novasCores.split(",").map(c => c.trim());
          console.log("==============================================\n");
          console.log("Cor do veículo alterada com sucesso!");
          console.log("==============================================\n");
          break;
        case 4:
          const novoPreco: number = parseFloat(readline.question("Digite o novo preço: "));
          veiculoParaAlterar.preco = novoPreco;
          console.log("==============================================\n");
          console.log("Preço do veículo alterado com sucesso!");
          console.log("==============================================\n");
          break;
        case 0:
          continuarAlterando = false;
          break;
        case 9:
          listarVeiculos(tipo);
          break;
        default:
          console.log("==============================================\n");
          console.log("\n*** Opção inválida. ***\n");
          console.log("Digite uma opção válida");
          console.log
