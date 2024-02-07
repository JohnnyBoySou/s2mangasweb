class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        console.log(`Olá, meu nome é ${this.nome} e sou um ${this.cargo}.`);
    }

    trabalhar() {
        console.log(`Estou trabalhando como ${this.cargo}.`);
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        console.log(`Estou gerenciando o departamento ${this.departamento}.`);
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        console.log(`Estou programando na linguagem ${this.linguagem}.`);
    }
}

function exibirErro(mensagem) {
    console.error(mensagem);
}

const nome = document.getElementById('nome').value;
const idade = document.getElementById('idade').value;
const cargo = document.getElementById('cargo').value;
const departamento = document.getElementById('departamento').value;
const linguagem = document.getElementById('linguagem').value;

try {
    // Verificando se todos os campos estão preenchidos
    if (nome && idade && cargo && departamento && linguagem) {
        // Criando instâncias de um gerente e de um desenvolvedor
        const gerente = new Gerente(nome, idade, cargo, departamento);
        const desenvolvedor = new Desenvolvedor(nome, idade, cargo, linguagem);

        // Chamando os métodos apropriados para cada um dos funcionários
        gerente.seApresentar();
        gerente.trabalhar();
        gerente.gerenciar();

        desenvolvedor.seApresentar();
        desenvolvedor.trabalhar();
        desenvolvedor.programar();
    } else {
        throw new Error('Todos os campos devem ser preenchidos.');
    }
} catch (error) {
    exibirErro(error.message);
}
