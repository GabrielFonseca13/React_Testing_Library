import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do Requisito 3', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;', async () => {
    renderWithRouter(<App />);

    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemonsLink).toBeInTheDocument();
    userEvent.click(favPokemonsLink);

    const emptyFavText = await screen.getByText(/No favorite pokemon found/i);
    expect(emptyFavText).toBeInTheDocument();
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

    const pokemonFav = screen.getByText(/Pikachu/i);
    expect(pokemonFav).toBeInTheDocument();
  });
});
