# Usuário

## REGRA fUNCIONAL RF01

1 .Registro de Usuário; 2. Login<br> 3. Recuperação de senha<br> 4. Resetar senha<br> 5. Remover Conta<br> 6. Atualizar/Editar dados da conta<br> 7. Mostra conta<br> 8. Verificação de acesso as rotas

## REGRA DE NEGOCIO RN02

> ### Registro de Usuário

    0. receber requisição do tipo **POST** na rota **/api/user/singup**
    1. deve validar formato do email;
    2. deve verificar se email já está em uso;
    3. deve diferenciar se a conta e para um candidato ou empresa;
    4. deve enviar um email de confirmação;
    5. se email for confirmado, usuario recebe status de ativo;

> ### Login

    0. receber requisição do tipo **POST** na rota ***/api/user/login**
    1. deve verificar se existe usuario com o email informado;
    2. verificar se a senha está correta;
    3. gera um token de acesso com o id do usuário;
    4. atualizar os dados com o token de acesso gerado;
    5. deve retorna **200** em caso de sucesso;

> ### Recuperação de senha

    0. receber requisição do tipo **POST** na rota **/api/user/password/forget**;
    1. validar email;
    2. verificar se existe usuário com o email informado;
    3. gera um token para o acesso a rota de resetar senha;
    4. enviar um email informando url para rota de resetar senha, com o token de acesso;
    5. deve retorna **200** em caso de sucesso;

> ### Resetar senha

    0. receber requisição do tipo **POST** na rota **/api/user/password/reset/**;
    1. receber senha e senha de confimação;
    2. validar se ambas estão iguais
    3. atualizar usuário com a nova senha;
    5. retorna **200** em caso de sucesso;

> ### Remover Conta

    0. receber requisição do tipo **DELETE** na rota **/api/user/me**;
    1. receber id do usuário;
    2. verificar se usuário existe;
    3. deletar usuário;
    4. deve retorna **204** em caso de sucesso;

> ### Atualizar/Editar dados da conta

    0. receber requisição do tipo **PUT** na rota **/api/user/me**;
    1. receber id do usuário;
    2. através do id verificar se usuário existe;
    3. receber dados que serão atualizados
    4. se email for informado, verificar se ja existe usuário com o mesmo email;
    5. se a senha for informada, exigir senha antiga
    6. se a senha for informada, exigir senha de confirmação
    7. atualizar todos os dados;
    8. deve retorna **200** em caso de sucesso;

> ### Mostra conta

    0. receber requisição do tipo **GET** na rota **/api/user/me**;
    1. receber id do usuário;
    2. verificar se usuário existe;
    3. retorna usuário;
    4. deve retorna **200** em caso de sucesso;

> ### Verificação de acesso as rotas

    0. verificar em todas as rotas, se usuário esta logado;
    1. verificar se usuário existe;
    2. verificar se usuário tem permissão para acessar a rota;
    3. deve permite acesso a rota para o usuário em caso de sucesso;

## REGRA NÃO fUNCIONAL RNF02

> ### Registro de Usuário

    0. senha deve ser encriptada;

> ### Login

    0. deve gerar um token **JWT** com o id do usuário;

> ### Resetar senha

    0. senha deve ser encriptada;

> ### Remover Conta

    0. pegar o id do usuário, pelo id de usuário da sessão;

> ### Atualizar/Editar dados da conta

    0. pegar o id do usuário, pelo id de usuário da sessão;
    1. senha deve ser encriptada;

> ### Mostra conta

    0. pegar o id do usuário, pelo id de usuário da sessão;
