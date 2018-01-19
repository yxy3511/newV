<template lang="jade">
#app
  nav.navbar.navbar-default.navbar-fixed-top
    .container
      // Brand and toggle get grouped for better mobile display
      .navbar-header.page-scroll
        button.navbar-toggle(type="button", data-toggle="collapse", data-target="#bs-example-navbar-collapse-1")
          span.sr-only Toggle navigation
          |           
          span.icon-bar
          |           
          span.icon-bar
          |           
          span.icon-bar
          |           
        //- a.navbar-brand.page-scroll(href="/page" )
        .navbar-brand.page-scroll.logo
          //- img(src="../images/logo.png", alt="Lattes theme logo")
          | Shengyi
      // Collect the nav links, forms, and other content for toggling
      #bs-example-navbar-collapse-1.collapse.navbar-collapse
        ul.nav.navbar-nav.navbar-right
          li.hidden
            a(href="#page-top") Home
          |             
          li
            //- a.page-scroll(href="#about") About
            a.page-scroll#home(href="/page") Home
          |             
          li
            //- a.page-scroll(href="#about") About
            a.page-scroll#aboutUs(href="/aboutUs") About Us
          |             
          //- li
          //-   a.page-scroll(href="#services") Services
          |             
          //- li
          //-   a.page-scroll#products(href="/products") Products
          li
            a.page-scroll#products(href="/products", data-toggle="dropdown", aria-expanded="false")
              | Products
              span.caret
            |           
            ul#menus.dropdown-menu
              li.txt
                a(href="/products/0" sid=0) All
              |             
              li.divider.marginT(role="separator")
              |             
          //-     li
          //-       a(href="/products/1") Leather Shoes
          //-     |             
          //-     li.divider(role="separator")
          //-     |             
          //-     li
          //-       a(href="/products/2") Gym Shoes
          //-     |             
          //-     li.divider(role="separator")
          //-     |             
          //-     li
          //-       a(href="/products/1") Crocs & Beach Shoes
          //-     |             
          //-     li.divider(role="separator")
          //-     |             
          //-     li
          //-       a(href="/products/2") Sandals
          //-     |             
          //-     li.divider(role="separator")
          //-     |             
          //-     li
          //-       a(href="/products/1") High-heeled Shoes
          //- |             
          //- li
          //-   a.page-scroll(href="#team") Team
          //- |             
          li
            a.page-scroll#contact(href="/contact") Contact 
  router-view        
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style scoped>
  /*require('/static/css/bootstrap.min.css')*/
  @import url("./assets/css/bootstrap.css");
  @import url("./assets/css/test.css");

</style>
