import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons: any = [];
  pokemon: any = '';
  img: string = '';
  hp: string = '';
  exp: string = '';
  attack: string = '';
  defense: string = '';
  speed: string = '';
  type: string = '';
  searchedName: string = '';
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
  myControl = new FormControl();
  options: string[] = [];
  filterByName!: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
    this.filterByName = this.myControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  //Function to SearchBar Autocomplete

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const onlyNames = this.data.map((pokemon) => pokemon.name.toLowerCase());
    return onlyNames.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  //Function to get all Pokemons

  getPokemons() {
    let pokemonData;
    let promises = [];

    for (let i = 1; i <= 1008; i++) {
      promises.push(
        this.pokeService
          .getPokemons(i)
          .toPromise()
          .then((res) => {
            pokemonData = {
              position: i,
              image:
                res.sprites.other.dream_world.front_default ||
                res.sprites.front_default ||
                '../../../assets/images/unown.png',
              name: res.name,
            };
            let pokemonName = res.name;
            let firstLetter = pokemonName.charAt(0);
            this.abcedario[firstLetter] += 1;
            this.data.push(pokemonData);
            this.dataSource = new MatTableDataSource<any>(this.data);
            this.dataSource.paginator = this.paginator;
          })
      );
    }

    Promise.all(promises).then(() => {
      console.log('done');
    });
  }

  //Function to apply filter pagination

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Function to get Pokemons by id

  getPokemonId(row: any) {
    this.pokeService.getPokemons(row).subscribe(
      (res) => {
        this.pokemon = res;
        (this.img =
          res.sprites.other.dream_world.front_default ||
          res.sprites.front_default ||
          '../../../assets/images/unown.png'),
          (this.hp = res.stats[0].base_stat);
        this.exp = res.base_experience;
        this.attack = res.stats[1].base_stat;
        this.defense = res.stats[2].base_stat;
        this.speed = res.stats[5].base_stat;
        this.type = res.types[0].type.name;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
