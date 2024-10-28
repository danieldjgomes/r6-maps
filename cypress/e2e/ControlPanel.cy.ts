
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
});
