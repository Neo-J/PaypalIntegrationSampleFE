<template>
    <Row :gutter=16>
        <Col span="16">
            <Card shadow>
                <div style="min-height: 200px;">
                    Cart
                    <item-in-cart :id="1" @priceChanged="total1 = $event"></item-in-cart>
                    <item-in-cart :id="2" @priceChanged="total2 = $event"></item-in-cart>
                </div>
                <div style="width:100%;min-height:20px;">
                    <div style="float:right;font-size:17px;"><b>Total:</b> ${{total1 + total2}}</div>
                </div>
            </Card>
        </Col>

        <Col span="8">
            <Row>
                <Card shadow>
                    <div style="min-height: 200px;">
                        <Row><b>Buyer:</b> {{buyer_name}}</Row>
                        <Row>
                            <b>Shipping Address:</b>
                            <Input v-model="shipping_address.address_line_1" placeholder="address_line_1" />
                            <Input v-model="shipping_address.address_line_2" placeholder="address_line_2" />
                            <Input v-model="shipping_address.admin_area_1" placeholder="Admin area1, for example:CA" />
                            <Input v-model="shipping_address.admin_area_2" placeholder="Admin area2, for example:San Francisco" />
                        </Row>
                        <Row><b>Postal Code:</b> <Input v-model="shipping_address.postal_code" placeholder="postal code" /></Row>
                        <Row><b>Country Code:</b> <Input v-model="shipping_address.country_code" placeholder="country code" /></Row>
                    </div>
                </Card>
            </Row>
            <Row>
                <!-- <div id="paypal-button"></div> -->
                <div id="paypal-button-container" style="margin-top:20px;"></div>
            </Row>
        </Col>
    </Row>
</template>

<script>
import ItemInCart from '@/components/ItemInCart.vue'

export default {

    components: {
      'item-in-cart' :  ItemInCart
    },
    
    data(){
        return {
            buyer_name: "Neo Jiang",
            shipping_address: {
                //The first line of the address. For example, number or street. For example, 173 Drury Lane.
                address_line_1: "123 Townsend St",
                address_line_2: "Floor 6",
                //A city, town, or village. Smaller than admin_area_level_1.
                admin_area_1: "CA",
                //The highest level sub-division in a country, which is usually a province, state, or ISO-3166-2 subdivision. 
                //Format for postal delivery. For example, CA and not California. 
                admin_area_2: "San Francisco",
                postal_code: "94107",
                country_code: "US"
            },
            total1: 0,
            total2: 0
        };
    },

    mounted() {
        let that = this;
        paypal.Buttons({
            createOrder: function(data, actions) {
                // Set up the transaction
                console.log(that.shipping_address);
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: that.total1 + that.total2
                        },
                        shipping: {
                            name: {
                                full_name: that.buyer_name
                            },
                            address: that.shipping_address
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                // Capture the funds from the transaction
                return actions.order.capture().then(function(details) {
                    // Show a success message to your buyer
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    return fetch('Http://localhost:8080/api/payment/paypal-transaction-complete', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    }).then(res => res.json())
                    .then(res => {
                        if(res) {
                            console.log(res);
                            that.$router.push({ name: 'Thank', params: { orderID: data.orderID }});
                        } else {
                            console.log(123);
                        }
                    });
                });
            }
        }).render('#paypal-button-container');
    },
    
    created() {
        // this.$nextTick(function(){
        //     paypal.Buttons().render('#paypal-button-container');
        // })
    }
}
</script>

