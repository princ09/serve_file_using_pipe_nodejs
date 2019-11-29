var InputComp = {
    data() {
        return {
            isHidden: true,
            input_value: "0",
            file_url: "",
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        };
    },
    methods: {
        getData() {
            this.src = this.input_value;
            /* axios
                 .get("http://localhost:7506/files/?file=" + this.input_value)
                 .then(response => {
                     var file_url = response.data;
                     var bytes = new Uint8Array(response.data);
                     var binary = bytes.reduce(
                         (data, b) => (data += String.fromCharCode(b)),
                         ""
                     );
                     this.src = "data:image/jpeg;base64," + btoa(binary);
                 });
             /*
             <!--<embed v-bind:src = "'http://localhost:7506/files/?file='+input_value"
             width = "800px"
             height = "2100px" / > -->
             */
        }
    },
    template: `
        <div class= "container">
        <form>
            <input type = "text" placeholder = "Enter Value" v-on:keyup.enter = "getData" v-model = "input_value" />
            <button  @click.prevent = "getData">Fetch</button>
        </form>
        <p>{{input_value}}</p>
        <button v-on:click="isHidden = !isHidden"> show</button>

        <img v-if = "!isHidden" v-bind:src ="'http://localhost:7506/files/?file='+src" alt = "" style = "width:500px; height:auto;" >
        

        </div>`
};

var Main = {
    data() {
        return {
            //   getList:[]
        };
    },
    /* methods:{
                 get_List(config_list){
                     console.log(config_list);
                     this.getList = config_list;
                    
                 }
             },
         */
    components: {
        //'list':List
        input_comp: InputComp
    },

    template: `
         <div clas="container">
         <div class="row">
             <input_comp></input_comp>
             </div>
         </div>
     </div>
             
       
         `
};
const bus = new Vue();
var myObject = new Vue({
    //router,
    el: "#app",

    components: {
        //'list':List,
        parent: Main
    }
});