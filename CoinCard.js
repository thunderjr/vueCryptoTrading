Vue.component("CoinCard", {
  props: ['coin'],
  template: `
    <div class="card my-3 mx-2 shadow" style="max-width: 38rem;">
      <span class="display-4 mx-auto my-3">{{coin}}/USDT</span>
      <trend :data="chartData" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth class="card-img-top">
      </trend>

      <div class="card-body">

        <div class="row">
          <span class="h6 col">Preço</span>
          <span class="h6 col">24hr (%)</span>
        </div>

        <div class="row">
          <span class="h5 col">{{formatDecimal(coinData.lastPrice)}}</span>
          <span class="h5 col" v-html="priceChangePercent"></span>
        </div>

        <div class="row mt-3">
          <div class="col">
            <span class="h6">Min</span>
            <span class="h5"><i class="fa fa-caret-down text-danger"></i></span>
          </div>
          <div class="col">
            <span class="h6">Max </span>
            <span class="h5"><i class="fa fa-caret-up text-success"></i></span>
          </div>
        </div>

        <div class="row">
          <span class="h5 col">{{formatDecimal(coinData.lowPrice)}}</span>
          <span class="h5 col">{{formatDecimal(coinData.highPrice)}}</span>
        </div>

      </div>

    </div>   
  `,
  data() {
    return({
      chartData: [],
      coinData: { priceChangePercent: "0.00" }
    })
  },
  computed: {
    priceChangePercent() {
      return `${
        (Number(this.coinData.priceChangePercent) >= 0) 
      ? "<span class='text-success'>+"
      : "<span class='text-danger'>"
      } ${Number(this.coinData.priceChangePercent).toFixed(2)}% </span>`
    }
  },
  mounted() {
    this.getChartData()
    setInterval(this.getChartData, 60000)
    setInterval(this.getCoinData, 500)
  },
  methods: {
    getChartData() {
      let date = new Date()
      date.setDate(date.getDate() -1)      
      axios.get(`http://localhost:8080/https://api.binance.com/api/v1/klines?symbol=${this.coin}USDT&interval=1h&startTime=${date.getTime()}`)
        .then(data => this.chartData = data.data.map(hourData => Number(hourData[1])))
    },
    getCoinData() {
      axios.get(`http://localhost:8080/https://api.binance.com/api/v3/ticker/24hr?symbol=${this.coin}USDT`)
        .then(response => this.coinData = response.data)
    },
    formatDecimal(x = 0) {
      let decimals = (this.coin === "XRP") ? 5 : 2
      return `$ ${Number(x).toFixed(decimals)}`
    }
  }
})