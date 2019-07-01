<template>
    <div class="ItemInCart">
        <Card>
            <Row>
                <Col span="6">
                    <img 
                        :src="img_url"
                        width="100px"
                        height="80px"
                    />
                </Col>
                <Col span="6">
                    <Row><b>Product Details:</b></Row>
                    <Row>{{product_name}}</Row>
                </Col>
                <Col span="4">
                    <b>Quantity</b>
                    <InputNumber :min="0" v-model="quantity"></InputNumber>
                </Col>
                <Col span="4">
                    <b>Unit Price:</b>
                    <Row>${{unit_price}}</Row>
                </Col>
                <Col span="4">
                    <b>Total Price:</b>
                    <Row>${{totalPrice}}</Row>
                </Col>
            </Row>
        </Card>
    </div>
    
</template>

<script>
import { timingSafeEqual } from 'crypto';
export default {

    props: {
      // Product ID
      id: {
        type: [String, Number],
        default: ''
      },
    },

    data(){
        return {
            quantity: 1,
            img_url:"",
            product_name: "",
            unit_price: 0
        };
    },

    computed: {
        totalPrice: function () {
            return this.quantity * this.unit_price
        }
    },

    watch: {
        // Executed when total price changed
        totalPrice: function (newVal, oldVal) {
            this.$emit("priceChanged", newVal);
        }
    },

    async created(){
        await fetch('http://localhost:8080/api/product/' + this.id, {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            },
        }).then(res => res.json())
        .then(res => {
            this.product_name = res.details,
            this.unit_price = res.unitPrice,
            this.img_url = res.imgURL
        });
    }
}
</script>
