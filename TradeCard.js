Vue.component("TradeCard", {
  props: ['coin', 'qtdCoin', 'priceBuy', 'i'],
  template: `
    <div class="card my-3 mx-2 p-0 shadow" style="position:relative">
      <a class="h4" href="javascript:void" @click="removeTrade(i)">
        <i class="fas fa-times-circle" style="position:absolute;right:10px;top:10px"></i>
      </a>
      <span class="card-title h5 mx-auto my-3">{{coin}}/USDT</span>
      <div class="card-body">        
        <table class="table borderless">
          <tr>
            <td class="h6">Preço</td>
            <td class="h6">Vl. Investido</td>
            <td class="h6">Em Carteira</td>
            <td class="h6">Lucro</td>
            <td class="h6">Lucro (%)</td>
          </tr>
          <tr>
            <td class="h5">{{formatDecimal(coinPrice)}}</td>
            <td class="h5">$ {{valueWhenBuy}}</td>
            <td class="h5">$ {{inWallet}}</td>
            <td class="h5" v-html="priceChange"></td>
            <td class="h5" v-html="priceChangePercent"></td>
          </tr>
        </table>
      </div>
    </div>   
  `,
  data() {
    return({
      coinPrice: 0,
    })
  },
  computed: {
    valueNow() { return (Number(this.qtdCoin)*Number(this.coinPrice)).toFixed(2) },
    valueWhenBuy() { return Number(Number(this.qtdCoin)*Number(this.priceBuy)).toFixed(2) },
    priceChange() {
      let returnValue = ''
      if (this.valueNow > this.valueWhenBuy) {
        returnValue = returnValue + "<span class='text-success'>+"
      } else {
        returnValue = returnValue + "<span class='text-danger'>"
      } 
      returnValue = `${returnValue}${(this.valueNow - this.valueWhenBuy).toFixed(2)}</span>`;
      return (returnValue)
    },
    priceChangePercent() {
      let returnValue = ''
      if (this.valueNow > this.valueWhenBuy) {
        returnValue = returnValue + "<span class='text-success'>+"
      } else {
        returnValue = returnValue + "<span class='text-danger'>"
      } 
      returnValue = `${returnValue}${(((this.valueNow - this.valueWhenBuy) / this.valueWhenBuy) * 100).toFixed(2)}%</span>`;
      return (returnValue)
    },
    inWallet() {
      return (this.qtdCoin * this.coinPrice).toFixed(2)
    }
  },
  methods: {
    getCoinData() {
      axios.get(`http://localhost:8080/https://api.binance.com/api/v3/ticker/price?symbol=${this.coin}USDT`)
        .then(response => this.coinPrice = response.data.price)
    },
    formatDecimal(x = 0) {
      let decimals = (this.coin === "XRP") ? 5 : 2
      return `$ ${Number(x).toFixed(decimals)}`
    },
    removeTrade(x) {
      this.$parent.trades.splice(x, 1);
      this.$parent.saveTrades();
    },
  },
  mounted() {
    setInterval(this.getCoinData, 1000)
  }
})