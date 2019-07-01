<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        NeoShop
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1" style="float:right">
                            <Icon type="ios-paper"></Icon>
                            Personal Info
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>{{currentRouteName}}</BreadcrumbItem>
                </Breadcrumb>
                <router-view></router-view>
                
            </Content>
            <Footer class="layout-footer-center">2019-2019 &copy; NeoShop</Footer>
        </Layout>
    </div>
</template>

<script>

    export default {
        
        data(){
            return {
                currentRouteName: ""
            };
        },

        methods: {
            getBreadCrumb() {
                this.currentRouteName = this.$route.name;
            }
        },

        watch: {
            // Change the BreadCrumb per route
            $route() {
                this.getBreadCrumb();
            }
        },
        
        created() {
            
        }
    }
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: absolute;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height: 30px;
    text-align: center;
    color: azure;
}
.layout-nav{
    width: 100%;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>