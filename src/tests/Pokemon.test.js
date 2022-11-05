import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do Requisito 6', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon: nome, tipo, peso, imagem', () => {
    renderWithRouter(<App />);
    const pokemonList = pokemons;
    const { averageWeight } = pokemonList[0];

    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toHaveTextContent(pokemonList[0].name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemonList[0].type);

    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokemonWeight)
      .toHaveTextContent(`${averageWeight.value} ${averageWeight.measurementUnit}`);

    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toHaveAttribute('src', pokemonList[0].image);
    expect(imgPokemon).toHaveAttribute('alt', `${pokemonList[0].name} sprite`);
  });
});
