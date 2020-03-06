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
      </div>
      <tradeModal name="tradeModal"></tradeModal>
      <simulatorModal name="simulatorModal"></simulatorModal>
    </div>
  `,
  data() {
      return {
          valorInicial: 27,
          lucro: 3,
          qtdTrades: 4,
          lucros: [],
          valoresFinais: [],
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
    }
});