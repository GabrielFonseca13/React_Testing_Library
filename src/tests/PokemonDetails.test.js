import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonsList = pokemons;

describe('Testes do Requisito 7 Teste se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const nameTitle = screen.getByText(`${pokemonsList[0].name} Details`);
    expect(nameTitle).toBeInTheDocument();

    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();

    const detailsPokemonText = screen.getByText(pokemonsList[0].summary);
    expect(detailsPokemonText).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const mapsTitle = screen.getByRole('heading', { name: `Game Locations of ${pokemonsList[0].name}`, level: 2 });
    expect(mapsTitle).toBeInTheDocument();

    const mapImages = screen.getAllByRole('img');
    expect(mapImages[1]).toHaveAttribute('src', pokemonsList[0].foundAt[0].map);
    expect(mapImages[1]).toHaveAttribute('alt', `${pokemonsList[0].name} location`);
    expect(mapImages[2]).toHaveAttribute('src', pokemonsList[0].foundAt[1].map);
    expect(mapImages[2]).toHaveAttribute('alt', `${pokemonsList[0].name} location`);

    const nameMap1 = screen.getByText(`${pokemonsList[0].foundAt[0].location}`);
    expect(nameMap1).toBeInTheDocument();
    const nameMap2 = screen.getByText(`${pokemonsList[0].foundAt[1].location}`);
    expect(nameMap2).toBeInTheDocument();
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);

    act(() => {
      history.push('/Favorites');
    });

    const pokemonFav = screen.getByText(/Pikachu/i);
    expect(pokemonFav).toBeInTheDocument();

    act(() => {
      history.push('/');
    });

    userEvent.click(moreDetailsLink);
    userEvent.click(favCheckbox);

    act(() => {
      history.push('/Favorites');
    });

    expect(pokemonFav).not.toBeInTheDocument();
  });
});
