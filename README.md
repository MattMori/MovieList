#MOVIE LIST - DNC

Link do repositório: https://github.com/MattMori/MovieList/tree/version-1

link do site hospedado: https://movie-list-git-version-1-mattmori.vercel.app/


 Neste projeto utilizei meus conhecimentos aprendidos sobre JS, HTML e CSS com React nos quais incluem principalmente os React hooks e o React router dom, o projeto foi feito em conjunto com as aulas da Escola DNC ministradas pelo professor Gabriel Salvador que possui uma didática excelente e com isto me possibilitou absorver muito mais rápido o conteúdo.


 O projeto estilizado por mim e adicionei uma funcionalidade nova no input de pesquisa na qual a lista de filmes é renderizada em tempo real conforme o nome é digitado, neste projeto grande parte da lógica foi feita em conjunto com o professor, mas garanti que eu estivesse entendendo elas e não apenas replicando por meio de revisões e testes, algumas partes eu implementei sozinho e depois comparei com o apresentado pelo professor para validar meu aprendizado, no fim pensei em aplicar alguma nova funcionalidade, onde me surgiu a ideia de utilizar o evento HTML onChange na pesquisa e modifiquei a requisição para que fosse obtido o conteúdo em português após uma pesquisa sobre o assunto, pretendo melhorar a parte visual da pagina inicial da pagina e apresentação de detalhes dos filmes futuramente.

 Requisitos Necessários para Executar o Projeto:

Para executar o projeto Movie List, você precisará do seguinte:

   -Node.js: Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo em https://nodejs.org/.
   -Clone o repositório do projeto para o seu computador usando o seguinte comando:
      git clone https://github.com/seu-usuario/movie-list.git
   -Acesse Movie-list no terminal com o comando:
    cd movie-list
   -Instale as dependências do projeto usando npm:
    npm install
   -Inicie o servidor de desenvolvimento:
    npm run dev
    
O projeto Movie List foi desenvolvido utilizando as seguintes tecnologias e linguagens:

    -JavaScript (ES6+)
    -React
    -React Router
    -HTML5
    -CSS3 (Sass)
    -Axios (para requisições HTTP)
    -ESLint (para linting do código)
    -Vite (para desenvolvimento e construção)
    -localforage (para armazenamento local)
    -match-sorter (para classificação de dados)
    -Outras dependências menores

    Funcionalidades do Projeto:

O projeto Movie List é uma aplicação web que permite aos usuários:

    -Visualizar uma lista de filmes populares da base de dados do The Movie Database (TMDb).
    -Realizar pesquisas por filmes com base em palavras-chave.
    -Visualizar os detalhes de um filme específico, incluindo título, imagem de fundo, subtítulo, gênero, orçamento, língua original, data de lançamento, popularidade, pontuação, e descrição.
    -Assistir aos trailers dos filmes diretamente na página de detalhes, quando disponíveis no YouTube.
    -istórico de Versionamento:

    Versão 1.0.0 - Main
      -Funcionalidade de listagem de filmes populares.
      -Funcionalidade de pesquisa por filmes.
      -Página de detalhes do filme.
      -Integração com a API do TMDb.
      -Estilos básicos de UI.
    Versão 1.1.0 - main 
      -Correção de erros de linting e acessibilidade.
      -Otimização de desempenho.
    Versão 1.2.0 - version 1
      -Exibição de trailers do YouTube.
      -Adição de documentação.
      -Melhorias na legibilidade do código.
      -Atualização de dependências.
      -Melhorias na interface de usuário.

Explicação das Páginas:

    Página Inicial (Home):
        -Apresenta uma lista de filmes populares.
        -Permite realizar pesquisas por filmes.
        -Clique em um filme para ver os detalhes.

    Página de Detalhes do Filme (MovieDetail):
        -Mostra informações detalhadas sobre um filme, incluindo título, imagem de fundo, subtítulo, gênero, orçamento, língua original, data de lançamento, popularidade, pontuação e descrição.
        -Exibe trailers do YouTube (se disponíveis).
        -Permite voltar à página inicial.

        
