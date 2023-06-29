/// <reference types="cypress" />

context('Pokemon Details Panel', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('Check if details button initiated as disabled', () => {
    cy.get('button#pokemon-details-toggle').should('be.disabled')
    cy.get('input#pokedex-search-field').type('pikachu')
    cy.intercept('GET', '/api/v2/pokemon/*').as('apiRequest')
    cy.wait('@apiRequest').then(() => {
      cy.get('button#pokemon-details-toggle').should('be.enabled')
    })
  })

  it('Search a pokemon and open details panel', () => {
    // Randomly search a pokemon
    const pokemonNumber = Math.floor(Math.random() * 999).toString()
    cy.get('input#pokedex-search-field').type(pokemonNumber)
    // focusout the input to trigger the search
    cy.get('input').blur()

    // Intercept pokemon API request and wait the response
    cy.intercept('GET', '/api/v2/pokemon/*').as('apiRequest')
    cy.wait('@apiRequest')

    cy.get('h1').should('contain', pokemonNumber)

    // Trigger to load the data for details panel (evolutions, spicies, moves, etc)
    cy.get('button#pokemon-details-toggle').click()

    cy.intercept('GET', '/api/v2/evolution-chain/*').as('apiRequest')
    cy.wait('@apiRequest')
    // Check pokemon evolutions
    cy.get('[class*="evolutions"] li').should('have.length.at.least', 1)

    // Check Species
    cy.get('label').contains('Species').next().should('not.be.empty')
    // Check Type
    cy.get('label')
      .contains('Type')
      .next()
      .get('span')
      .should('have.length.at.least', 1)
    // Check Abilities
    cy.get('label')
      .contains('Abilities')
      .next()
      .get('span')
      .should('have.length.at.least', 1)
    // Check Sprites
    cy.get('label')
      .contains('Sprites')
      .next()
      .get('img')
      .should('have.length.at.least', 1)
    // Check Moves
    cy.get('label')
      .contains('Moves')
      .next()
      .get('table tbody tr')
      .should('have.length.at.least', 1)
  })
})
