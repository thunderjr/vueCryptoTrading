Vue.component("navbar", {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-0">
      <a class="navbar-brand" href="#">
        <span class="h2">
          <i class="fab fa-bitcoin"></i>
        </span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active h5">
            <a class="badge badge-dark p-1" href="#" @click="showTradeModal">Adicionar Trade</a>
          </li>
        <!--  <li class="nav-item">
            <a class="nav-link" href="#"></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"></a>
          </li>-->
        </ul>
        <span class="navbar-text">
          Flávio Marques Júnior
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
    }
  }
})