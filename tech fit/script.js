<script>
    const linkPlanos = document.querySelector('a[href="#"]'); // Ajuste o seletor conforme necessário
    const secaoPlanos = document.getElementById('secao-planos');

    linkPlanos.addEventListener('click', (e) => {
        e.preventDefault();
        // Alterna a visibilidade
        if (secaoPlanos.style.display === 'none') {
            secaoPlanos.style.display = 'block';
            secaoPlanos.scrollIntoView({ behavior: 'smooth' });
        } else {
            secaoPlanos.style.display = 'none';
        }
    });
</script>
/*processo cadastro formulario*/
async function processarCadastro(dadosCliente) {
    // 1. Envia o CPF para o backend
    const response = await fetch('/api/verificar-cliente', {
        method: 'POST',
        body: JSON.stringify({ cpf: dadosCliente.cpf })
    });
    const resultado = await response.json();

    // 2. Lógica baseada no status recebido
    if (resultado.status === 'nao_cadastrado') {
        // Segue fluxo de cadastro
    } else if (resultado.status === 'cadastrado_sem_matricula') {
        alert("Já possui cadastro. Vamos para a matrícula?");
        // Abre modal de matrícula
    } else if (resultado.status === 'ja_matriculado') {
        renderizarPainelAluno(resultado.dadosMatricula);
    }
}

// script.js

// 1. Seleção de Elementos (Cuidado com o DOM)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    
    // 2. Manipulação de Eventos
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página (Crucial!)
        
        // Coleta dos dados
        const dados = {
            nome: document.getElementById('nome').value,
            nascimento: document.getElementById('nascimento').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value, // Lembre-se de adicionar no HTML
            endereco: document.getElementById('endereco').value,
            genero: document.getElementById('genero').value
        };

        // 3. Chamada da API
        try {
            const resposta = await fetch('http://localhost:3000/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            
            const resultado = await resposta.json();
            console.log("Resposta do servidor:", resultado);
            
            // Lógica pós-envio
        } catch (error) {
            console.error("Erro na conexão:", error);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btn-iniciar');
    const areaHero = document.getElementById('area-hero');
    const formContainer = document.getElementById('form-container');
    const form = document.getElementById('cadastroForm');

    // Ação de clicar no botão "INICIAR COMPILAÇÃO"
    btnIniciar.addEventListener('click', () => {
        areaHero.style.display = 'none'; // Esconde o texto
        formContainer.style.display = 'block'; // Mostra o formulário
    });

    // Ação de enviar o formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById('nome').value,
            nascimento: document.getElementById('nascimento').value,
            cpf: document.getElementById('cpf').value,
            // ... capture os outros dados
        };

        // Aqui você chama sua lógica de verificação
        await processarCadastro(dados);
    });
});