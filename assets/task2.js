class main_collection extends HTMLElement{
    constructor(){
        super();
        var product_limit = document.querySelector("[product_limit]");
        //var pagination_btn = document.querySelectorAll("[data-pagination]");
        var sort_by = document.querySelector("#sort-by");
        var add_cart_btn = document.querySelectorAll(".add_cart_btn");
        var body_main = document.getElementsByTagName("BODY")[0];
        if(product_limit!==null){
            this.ShowProduct(product_limit);
        } 
        if(sort_by!==null){
            this.SortBy(sort_by);
        } 
        if (add_cart_btn.length > 0) {
            this.AddCart(add_cart_btn);
        }
        // if (pagination_btn.length > 0) {
        //     this.pagination(pagination_btn);
        // }

        if(body_main!=null){
           this.pagination()
        }
    
      
    }

    SortBy(sort_by){
        sort_by.addEventListener('change',(event)=>{
            event.preventDefault();
        })
    }

    ShowProduct(product_limit){
        product_limit.addEventListener('change',(event)=>{
            var change_value=product_limit.value;
            fetch(`/collections/task-1?count=${change_value}&view=alternate`)
            .then(response=>response.text())
            .then((data) => {
                document.querySelector("main-collection").innerHTML = data;
                console.log(data);
            });
        })
    }
    AddCart(add_cart_btn){
        add_cart_btn.forEach((button) => {
            button.addEventListener("click", (event)=>{
                event.preventDefault();
                let pro_id  = button.getAttribute("product_id");
                var var_id = document.querySelector(`select[product_id="${pro_id}"]`).value;
                let formData = {
                    'items': [{
                        'id': var_id,
                        'quantity': 1
                    }]
                };
                fetch(window.Shopify.routes.root + 'cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    window.location.href="/cart"
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
        })   
    }
    
    pagination() {
       var y = window.scrollY;
          if (y >= 800) {
              const.log("true")
          } else {
              const.log("false")
          }
      
        // pagination_btn.forEach((button) => {
        //     button.addEventListener('click', () => {
        //         event.preventDefault();
        //         var page_no = button.getAttribute("page_no");
        //         var state = ''
        //         var title = ''
        //         var url = `/collections/home-page?page=${page_no}`
        //         history.pushState(state, title, url);
        //         fetch(`/collections/home-page?page=${page_no}&view=alternate`)
        //         .then(response => response.text())
        //         .then((data) => {
        //             document.querySelector("main-collection").innerHTML = data;
        //           console.log(data);
        //         });
        //     })
        // })
    } 
}
customElements.define("main-collection", main_collection)





