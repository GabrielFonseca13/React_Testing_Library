import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonList = pokemons;

describe('Testes do Requisito 6', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon: nome, tipo, peso, imagem', () => {
    renderWithRouter(<App />);

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
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonList[0].id}`);
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    act(() => {
      history.push('/Favorites');
    });

    const pokemonFavIcon = screen.getAllByRole('img');
    expect(pokemonFavIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavIcon[1]).toHaveAttribute('alt', `${pokemonList[0].name} is marked as favorite`);
  });
});
