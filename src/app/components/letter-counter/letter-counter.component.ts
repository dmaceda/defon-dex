import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-letter-counter',
  templateUrl: './letter-counter.component.html',
  styleUrls: ['./letter-counter.component.scss'],
})
export class LetterCounterComponent {
  constructor(private pokeService: PokemonService) {}

  abcedario: any = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    ñ: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  ngOnInit(): void {
    this.countPokemonsByLetter();
  }

  countPokemonsByLetter() {
    for (let i = 1; i <= 1010; i++) {
      this.pokeService.getPokemons(i).subscribe(
        (res) => {
          let pokemonName = res.name;
          let firstLetter = pokemonName.charAt(0);
          this.abcedario[firstLetter] += 1;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
