<template>
    <div class="thank">
        <Card>
            <p slot="title">
                CONFIRMATION
            </p>
            <Row>Thank you! Your order is complete.</Row>
            <Row>Your order number is: {{orderID}}.</Row>
        </Card>
        <Button type="primary" @click="goBack()" style="margin-top:20px;float:right;">
            Back
            <Icon type="chevron-left"></Icon>
        </Button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            orderID: ""
        };
    },

    methods: {
        goBack(){
            this.$router.go(-1);
        }
    },

    created() {
        this.orderID = this.$route.params.orderID;
    }
}
</script>

<style>

</style>

