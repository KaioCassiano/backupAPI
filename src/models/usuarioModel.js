var database = require("../database/config")

function verificarEmailExistente(email) {
    var instrucaoSql = `
        SELECT email  from usuario where email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, fkUnidade as UnidadeID FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkUnidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkUnidade);

    return verificarEmailExistente(email)
    .then(emailExiste => {
        if(emailExiste){
            throw new Error("Email ja cadastrado e estou no model verificarEmail")
        } else {
            // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
            //  e na ordem de inserção dos dados.
            var instrucaoSql = `
                INSERT INTO usuario (nome, email, senha, fkUnidade) VALUES ('${nome}', '${email}', '${senha}','${fkUnidade}');
            `;
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);

        }
    })
       
    
}



module.exports = {
    autenticar,
    verificarEmailExistente,
    cadastrar
};