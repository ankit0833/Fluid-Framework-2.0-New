// products limit on collection 
class main_collection extends HTMLElement{
    constructor(){
        super();
        var product_limit = document.querySelector("[product_limit]");
        var sort_by = document.querySelector("#sort-by");
        if(product_limit!==null){
            this.ShowProduct(product_limit);
        } 
        if(sort_by!==null){
            this.SortBy(sort_by);
        } 
    }
    ShowProduct(product_limit){
        product_limit.addEventListener('change',(event)=>{
            var change_value=product_limit.value;
            window.location.href=`?count=${change_value}`
        })
    }
    SortBy(sort_by){
        Shopify.queryParams = {};
        if (location.search.length) {
            var params = location.search.substr(1).split('&');
            for (var i = 0; i < params.length; i++) {
                var keyValue = params[i].split('=');
                if (keyValue.length) {
                    Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
                }
            }
        }
        // Update sort_by query parameter on select change
        document.querySelector('#sort-by').addEventListener('change', function(e) {
            var value = e.target.value;
            Shopify.queryParams.sort_by = value;
            location.search = new URLSearchParams(Shopify.queryParams).toString();
        });
    }
}
customElements.define("main-collection",main_collection)