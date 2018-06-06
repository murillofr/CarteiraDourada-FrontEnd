import { Component } from '@angular/core';

import { ConquistasPage } from '../conquistas/conquistas';
import { PerfilPage } from '../perfil/perfil';
import { PesquisaPage } from '../pesquisa/pesquisa';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PesquisaPage;
  tab2Root = PerfilPage;
  tab3Root = ConquistasPage;

  constructor() {
    
  }
}
