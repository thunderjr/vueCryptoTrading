const simulatorModal = Vue.component("simulatorModal", {
    template: `
        <modal name="simulatorModal" height="auto" class="p-3" style="max-width: 20rem">
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

            <button class="btn btn-primary my-1">
                Adicionar
            </button>

        </modal>
    `,
    data: () => ({
        inputCoinQtd: '',
        inputDollarQtd: '',
        inputPriceWhenBuyed: '',
        inputMoeda: 'XRP',
    }),
    methods: {
        
    }
})