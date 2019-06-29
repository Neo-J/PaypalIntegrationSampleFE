<template>
    <Row :gutter=16>
        <Col span="16">
            <Card>
                <div style="min-height: 200px;">
                    Cart
                </div>
            </Card>
        </Col>

        <Col span="8">
            <Card>
                <div style="min-height: 200px;">
                    Buyer
                </div>
            </Card>
            <!-- <div id="paypal-button"></div> -->
            <div id="paypal-button-container"></div>

        </Col>
    </Row>
</template>

<script>
export default {
    
    data(){
        return {};
    },

    mounted() {
        paypal.Buttons({
            createOrder: function(data, actions) {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '0.01'
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

