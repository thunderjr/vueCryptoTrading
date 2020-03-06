Vue.component("navbar", {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-0">
      <a class="navbar-brand my-auto" href="#">
        <span class="h2">
          <i class="fab fa-bitcoin"></i>
        </span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto p-0">
          <li class="nav-item h5 my-auto">
            <a class="nav-link" href="#" @click="showTradeModal">Adicionar Trade</a>
          </li>
          <li class="nav-item h5 my-auto">
            <a class="nav-link" href="#" @click="showSimulatorModal">Simulador de Operações</a>
          </li>
        </ul>
        <span class="navbar-text">
          <div class="d-flex flex-column">
            Flávio Marques Júnior
          </div>
        </span>
      </div>
    </nav>
  `,
  data() {
    return ({

    })
  },
  methods: {
    showTradeModal() {
      this.$modal.show("tradeModal")
    },
    showSimulatorModal() {
      this.$modal.show("simulatorModal")
    }
  }
})