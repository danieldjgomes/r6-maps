
describe('ControlPanel Component', () => {
  beforeEach(() => {
    // Supondo que o ControlPanel esteja na página inicial ou em uma rota específica para testes.
    cy.visit(''); // Ajuste a rota para onde o ControlPanel é renderizado
  });

  it('renders the hamburger button and toggles the panel open and close', () => {
    // Verifica o botão hamburger inicial (☰)
    cy.get('button.hamburger-btn').should('contain.text', '☰');

    // Clica para abrir o painel
    cy.get('button.hamburger-btn').click();

    // Verifica se o botão mudou para o ícone de fechar (✖)
    cy.get('button.hamburger-btn').should('contain.text', '✖');

    // Verifica se o painel está visível e abriu na posição correta
    cy.get('.control-panel').should('have.class', 'open').and('be.visible');

    // Clica para fechar o painel
    cy.get('button.hamburger-btn').click();

    // Verifica se o painel fechou
    cy.get('.control-panel').should('not.have.class', 'open');
    cy.get('button.hamburger-btn').should('contain.text', '☰');
  });

  it('renders OperatorPanel and MapPreparationPanel components', () => {
    // Abre o painel para que os componentes estejam visíveis
    cy.get('button.hamburger-btn').click();

    // Verifica se o texto dos componentes internos está presente
    cy.contains('Defense Operators').should('exist'); // Ajuste conforme necessário
    cy.contains('Map Preparations').should('exist'); // Ajuste conforme necessário
  });

  it('adds an operator icon to the map', () => {
    // Abre o painel
    cy.get('button.hamburger-btn').click();

    // Seleciona o operador no painel de operadores e clica para adicionar ao mapa
    cy.get('.operator-icon').eq(1).click(); // Ajuste conforme necessário para selecionar o operador correto

    // Verifica se o ícone foi adicionado ao mapa
    cy.get('.map-container').should('exist');
    cy.get('button.hamburger-btn').click();
    cy.get('.control-panel').should('not.have.class', 'open');

    // Clica em uma coordenada específica do mapa para adicionar o ícone
    cy.get('.map-container').click(500, 200); // Ajuste as coordenadas conforme necessário
    cy.get('.map-container').click(); // Clica novamente para garantir que o ícone seja adicionado

    // Verifica se o ícone foi adicionado ao mapa
    cy.get('.icon-items').first().should('exist');

  });

  it('displays tooltip with operator details on icon hover', () => {
    // Abre o painel
    cy.get('button.hamburger-btn').click();

    // Seleciona o operador no painel de operadores e clica para adicionar ao mapa
    cy.get('.operator-icon').eq(1).click(); // Ajuste conforme necessário para selecionar o operador correto

    // Verifica se o ícone foi adicionado ao mapa
    cy.get('.map-container').should('exist');
    cy.get('button.hamburger-btn').click();
    cy.get('.control-panel').should('not.have.class', 'open');

    // Clica em uma coordenada específica do mapa para adicionar o ícone
    cy.get('.map-container').click(500, 200); // Ajuste as coordenadas conforme necessário
    cy.get('.map-container').click(); // Clica novamente para garantir que o ícone seja adicionado

    // HOVER no ícone e verificar a classe do contêiner de tooltip
    cy.get('.icon-items').first().trigger('mouseover'); // Simula o hover

    // Verifica se o tooltip está presente
    cy.get('.tooltip-container')
        .should('exist') // Verifica se o tooltip está presente
        .within(() => { // Dentro do contêiner do tooltip, verifique o título e a descrição
          cy.get('h3.tooltip-title')
              .should('exist') // Verifica se o título existe
              .and('have.text', 'Rook'); // Verifica se o texto do título está correto

          cy.get('p.tooltip-description')
              .should('exist') // Verifica se a descrição existe
              .and('have.text', 'Julien Nizan'); // Verifica se o texto da descrição está correto
        });
  });


});
