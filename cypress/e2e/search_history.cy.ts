/// <reference types="cypress" />

context('Main Features', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('Search a pokemon and check search history component', () => {
    cy.get('input#pokedex-search-field').type('pikachu')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'pikachu')
    cy.get('button#search-history-toggle').click()
    cy.get('#search-history').should('be.visible')
    cy.get('#search-history ul li').should('have.length', 1)
    cy.get('#search-history ul li').should('contain', 'pikachu')
  })

  // Navigate to two different pokemons
  // and check if the search history component is showing the two items
  // and if the option to navigate by clicking on the search history is working
  it('Navigate using search history: clicking on pokemon previously visited', () => {
    cy.get('input#pokedex-search-field').type('4')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'charmander')
    // search another pokemon
    cy.get('input#pokedex-search-field').type('6')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'charizard')
    cy.get('button#search-history-toggle').click()
    cy.get('#search-history').should('be.visible')
    cy.get('#search-history ul li').should('have.length', 2)
    cy.get('#search-history ul li').should('contain', 'charmander')

    // Get the pokemon name from the first element of the search history
    cy.get('#search-history ul li:first-of-type span:last-of-type')
      .invoke('text')
      .then((text) => {
        const pokemonName = text
        // Click on the first element of the search history
        cy.get('#search-history ul li:first-of-type button').click()
        cy.wait(200)
        // Check if the pokemon name is the same as the one from the first element of the search history
        cy.get('h1').should('contain', pokemonName)
      })
  })
})
