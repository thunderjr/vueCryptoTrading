new Vue({
  el: "#app",
  template: `
    <div>
      <navbar></navbar>
      <div class="container px-0">
        <div class="row justify-content-center mt-3">
          <CoinCard coin="XRP" class="col-md-3 col-sm"></CoinCard>
          <CoinCard coin="BCH" class="col-md-3 col-sm"></CoinCard>
        </div>

        <div class="row mt-4 p-0">
          <TradeCard v-for="(trade, i) in trades" :key="i" :i="i" :coin="trade.coin" :qtdCoin="trade.qtdCoin" :priceBuy="trade.priceBuy"></TradeCard>
        </div>

        <modal name="tradeModal" height="auto">
          <div class="p-3" style="max-width: 20rem">
            <input class="form-control m-1" v-model="inputCoinQtd" :placeholder="'Qtd. em '+inputMoeda">
            
            <div class="row ml-1 d-flex justify-content-between">
              <input class="form-control col-4" v-model="inputDollarQtd" placeholder="Qtd. em Dólar" disabled>
              <input class="form-control col mr-2 ml-2" v-model="inputPriceWhenBuyed" placeholder="Preço de Compra">
            </div>

            <select class="custom-select m-1 border-top-0 border-left-0 border-right-0 shadow-none" v-model="inputMoeda">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="BCH">BCH</option>
              <option value="XRP">XRP</option>
              <option value="DASH">DASH</option>
              <option value="LTC">LTC</option>
            </select>
            <button class="btn btn-primary my-1" v-on:click="addTrade">
              Adicionar
            </button>
          </div>
        </modal>
      </div>
    </div>
  `,
  data() {
      return {
          valorInicial: 27,
          lucro: 3,
          qtdTrades: 4,
          lucros: [],
          valoresFinais: [],
          inputCoinQtd: '',
          inputDollarQtd: '',
          inputPriceWhenBuyed: '',
          inputMoeda: 'XRP',
          trades: [],
      }
  },
  computed: {
    newTrade() {
      return {
        coin: this.inputMoeda,
        qtdCoin: this.inputCoinQtd,
        priceBuy: this.inputPriceWhenBuyed
      }
    }
  },
  watch: {
    valorInicial() { this.calculateTrades() },
    lucro() { this.calculateTrades() },
    qtdTrades(v) { this.calculateTrades() },
    inputCoinQtd(v) { this.inputCoinQtd = v.replace(",", "."); this.inputDollarQtd = (Number(v) * Number(this.inputPriceWhenBuyed)).toFixed(2) },
    inputPriceWhenBuyed(v) { this.inputPriceWhenBuyed = v.replace(",", "."); this.inputDollarQtd = (Number(this.inputCoinQtd) * Number(v)).toFixed(2) }
  },
  mounted() {
    this.calculateTrades()
    if (localStorage.getItem('trades')) {
      try {
        this.trades = JSON.parse(localStorage.getItem('trades'));
      } catch(e) {
        localStorage.removeItem('trades');
      }
    }
  },
  methods: {
      calculateTrades() {
        this.lucros = [...Array(this.qtdTrades).keys()].map(i => ((( this.valorInicial * (this.lucro / this.qtdTrades) / 100) + (this.valorInicial * (this.lucro / this.qtdTrades) / 100) * i) - (this.valorInicial * 0.1 / 100) * this.qtdTrades).toFixed(3))

        this.valoresFinais = this.lucros.map(i => (Number(i) + this.valorInicial).toFixed(3))
      },  
      addTrade() {
        if (!this.newTrade) {
          return;
        }    
        this.trades.push(this.newTrade);
        this.newTrade = '';
        this.saveTrades();
      },
      saveTrades() {
        const parsed = JSON.stringify(this.trades);
        localStorage.setItem('trades', parsed);
      }
    }
});