describe('Filtrado del catálogo TechStore', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/', {
      timeout: 30000
    })

    cy.contains('Productos destacados', {
      timeout: 30000
    }).should('be.visible')
  })

  it('permite filtrar por categoría y luego por búsqueda', () => {
    // Comprobar que el catálogo cargó
    cy.get('[data-cy="product-card"]', {
      timeout: 30000
    })
      .should('exist')
      .and('have.length.at.least', 1)

    // Seleccionar la categoría Periféricos
    cy.get('[data-cy="category-peripherals"]')
      .should('be.visible')
      .click()

    // Deben aparecer teclado y mouse
    cy.contains('Core Mechanical 75')
      .should('be.visible')

    cy.contains('Flow Wireless Mouse')
      .should('be.visible')

    // Buscar únicamente el mouse
    cy.get('[data-cy="search-input"]')
      .should('be.visible')
      .clear()
      .type('mouse')

    // Solo debe quedar el producto correspondiente
    cy.get('[data-cy="product-card"]')
      .should('have.length', 1)

    cy.contains('Flow Wireless Mouse')
      .should('be.visible')

    cy.contains('Core Mechanical 75')
      .should('not.exist')
  })
})


